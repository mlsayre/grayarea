class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauth_providers => [:facebook, :twitter, :google_oauth2]

  validates_presence_of :username

  validates_length_of :username, :maximum => 15
  validates_length_of :username, :minimum => 3
  validates_length_of :about, :maximum => 80

  validates :email, :uniqueness => {:case_sensitive => false}
  validates :username, :uniqueness => {:case_sensitive => false}

  has_attached_file :avatar, :styles => {
    small: '80x80>',
    large: '300x300>'
    },
    :default_url => 'https://s3-us-west-2.amazonaws.com/apavatars/ap_generic_avatar80.png'
  # validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  # validates_attachment_file_name :avatar, :matches => [/png\Z/, /jpe?g\Z/]
  # Explicitly do not validate
  do_not_validate_attachment_file_type :avatar

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:reset_password_token)
      where(reset_password_token: conditions[:reset_password_token]).first
    else
      conditions.permit! if conditions.class.to_s == "ActionController::Parameters"
      where(conditions).first
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
    #where(auth.slice(:provider, :uid)).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      if auth.provider == "twitter"
        user.username = auth.info.nickname
        user.email = auth.info.nickname + "@twitter.com"
        user.avatar = auth["info"]["image"].sub("_normal", "")
      elsif auth.provider == "facebook"
        user.username = "FB_User" + rand(10000).to_s
        user.email = "temporary@email.com" + rand(10000).to_s
        user.avatar = auth["info"]["image"]
      else # Google login
        user.username = auth.info.first_name[0...12] + rand(1000).to_s
        user.email = auth["info"]["email"]
        #user.email = "temporary@email.com" + rand(10000).to_s
        #user.avatar = auth["info"]["image"]
        user.avatar = 'https://s3-us-west-2.amazonaws.com/apavatars/ap_generic_avatar80.png'
      end

    end
  end

  def self.new_with_session(params, session)
    if session["devise.user_attributes"]
      new(session["devise.user_attributes"]) do |user|
        user.attributes = params
        user.valid?
      end
    else
      super
    end
  end

  def self.avatarpartsurl(part, number)
    thenum = "%03d" % number
    if part == "bg"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/bg/obj_avatarBG_" + thenum + ".png"
    elsif part == "head"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/head/obj_avatarHead_" + thenum + ".png"
    elsif part == "mouth"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/mouth/obj_avatarMouth_" + thenum + ".png"
    elsif part == "eyes"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/eyes/obj_avatarEyes_" + thenum + ".png"
    elsif part == "deco"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/deco/obj_avatarDeco_" + thenum + ".png"
    elsif part == "hair"
      url = "https://s3-us-west-2.amazonaws.com/wordstretch/avatars/hair/obj_avatarHair_" + thenum + ".png"
    end
  end

  def self.avatarpartspoints(part, number, count)
    if part == "bg"
      pointsneeded = {1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0,
                      10 => 0, 11 => 0, 12 => 0, 13 => 0, 14 => 0, 15 => 0, 16 => 0, 17 => 0, 18 => 0,
                      19 => 0, 20 => 0, 21 => 400, 22 => 400, 23 => 400, 24 => 400, 25 => 800, 26 => 800, 
                      27 => 800, 28 => 800, 29 => 800, 30 => 800, 31 => 800, 32 => 800, 33 => 800, 
                      34 => 800, 35 => 1200, 36 => 1200}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    elsif part == "head"
      pointsneeded = {1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 400, 7 => 400, 8 => 600, 9 => 800, 10 => 1200,
                      11 => 400, 12 => 400, 13 => 400, 14 => 400, 15 => 600, 16 => 600, 17 => 800, 18 => 800, 19 => 1200, 
                      20 => 1200}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    elsif part == "mouth"
      pointsneeded = {1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0,
                      11 => 0, 12 => 0, 13 => 400, 14 => 400, 15 => 500, 16 => 500, 17 => 600, 18 => 600, 19 => 600, 
                      20 => 600}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    elsif part == "eyes"
      pointsneeded = {1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0,
                      11 => 200, 12 => 200, 13 => 400, 14 => 400, 15 => 500, 16 => 500, 17 => 700, 18 => 700, 19 => 800, 
                      20 => 800}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    elsif part == "deco"
      pointsneeded = {0 => 0, 1 => 0, 2 => 0, 3 => 300, 4 => 500, 5 => 750, 6 => 300, 7 => 300, 8 => 500, 9 => 500,
                      10 => 750, 11 => 750, 12 => 900, 13 => 900, 14 => 1000, 15 => 1000, 16 => 1200, 17 => 1200, 
                      18 => 1500, 19 => 1500}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    elsif part == "hair"
      pointsneeded = {0 => 0, 1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0, 6 => 0, 7 => 0, 8 => 0, 9 => 0, 10 => 0,
                      11 => 0, 12 => 0, 13 => 300, 14 => 300, 15 => 400, 16 => 400, 17 => 500, 18 => 500, 19 => 600, 
                      20 => 600}
      if count == "true"
        return pointsneeded.count
      else
        return pointsneeded[number]
      end
    end
  end

  def self.giveguessratio(userid, min)
    if User.find(userid).lifetimegamesguesser < min
      rat = -1
    else
      rat = (User.find(userid).lifetimegamesguesser.to_f / User.find(userid).lifetimegamesgiver.to_f).round(2)
      if rat > 6
        shouldbe = (User.find(userid).lifetimegamesguesser.to_f / 6.to_f).ceil
        behind = shouldbe - User.find(userid).lifetimegamesgiver
      else
        behind = 0
      end
    end
    return [rat, behind]
  end

  def password_required?
    super && provider.blank?
  end

  def update_with_password(params, *options)
    if encrypted_password.blank?
      update_attributes(params, *options)
    else
      super
    end
  end

end
