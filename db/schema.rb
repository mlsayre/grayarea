# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20200408204122) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chats", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "game_id"
    t.string "message"
  end

  create_table "games", force: :cascade do |t|
    t.string "gamestatus"
    t.integer "giver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "allwords", default: [], array: true
    t.string "correctwords", default: [], array: true
    t.string "loseword"
    t.string "hintword1", default: ""
    t.string "hintword2", default: ""
    t.integer "hintnum1", default: 0
    t.integer "hintnum2", default: 0
    t.string "gsr1_words", default: [], array: true
    t.string "gsr2_words", default: [], array: true
    t.string "gsr3_words", default: [], array: true
    t.integer "guesser_id1", default: 0
    t.integer "guesser_id2", default: 0
    t.integer "guesser_id3", default: 0
    t.string "gsr1_status", default: "hint1,word1"
    t.string "gsr2_status", default: "hint1,word1"
    t.string "gsr3_status", default: "hint1,word1"
    t.integer "gsr1_spoiler", default: 0
    t.integer "gsr2_spoiler", default: 0
    t.integer "gsr3_spoiler", default: 0
    t.integer "gsr1_cheat", default: 0
    t.integer "gsr2_cheat", default: 0
    t.integer "gsr3_cheat", default: 0
    t.integer "gsr4_cheat", default: 0
    t.integer "gsr5_cheat", default: 0
    t.integer "gsr6_cheat", default: 0
    t.integer "gsr4_spoiler", default: 0
    t.integer "gsr5_spoiler", default: 0
    t.integer "gsr6_spoiler", default: 0
    t.string "gsr4_status", default: "hint1,word1"
    t.string "gsr5_status", default: "hint1,word1"
    t.string "gsr6_status", default: "hint1,word1"
    t.integer "guesser_id4", default: 0
    t.integer "guesser_id5", default: 0
    t.integer "guesser_id6", default: 0
    t.string "gsr4_words", default: [], array: true
    t.string "gsr5_words", default: [], array: true
    t.string "gsr6_words", default: [], array: true
    t.integer "giver_chats", default: 0
    t.integer "gsr1_chats", default: 0
    t.integer "gsr2_chats", default: 0
    t.integer "gsr3_chats", default: 0
    t.integer "gsr4_chats", default: 0
    t.integer "gsr5_chats", default: 0
    t.integer "gsr6_chats", default: 0
    t.string "hintword3", default: ""
    t.integer "hintnum3", default: 0
    t.integer "gsr1_score", default: 0
    t.integer "gsr2_score", default: 0
    t.integer "gsr3_score", default: 0
    t.integer "gsr4_score", default: 0
    t.integer "gsr5_score", default: 0
    t.integer "gsr6_score", default: 0
    t.string "gsr1_h1words", default: [], array: true
    t.string "gsr2_h1words", default: [], array: true
    t.string "gsr3_h1words", default: [], array: true
    t.string "gsr4_h1words", default: [], array: true
    t.string "gsr5_h1words", default: [], array: true
    t.string "gsr6_h1words", default: [], array: true
    t.string "gsr1_h2words", default: [], array: true
    t.string "gsr2_h2words", default: [], array: true
    t.string "gsr3_h2words", default: [], array: true
    t.string "gsr4_h2words", default: [], array: true
    t.string "gsr5_h2words", default: [], array: true
    t.string "gsr6_h2words", default: [], array: true
    t.string "gsr1_h3words", default: [], array: true
    t.string "gsr2_h3words", default: [], array: true
    t.string "gsr3_h3words", default: [], array: true
    t.string "gsr4_h3words", default: [], array: true
    t.string "gsr5_h3words", default: [], array: true
    t.string "gsr6_h3words", default: [], array: true
    t.integer "gsr1_heart", default: 0
    t.integer "gsr2_heart", default: 0
    t.integer "gsr3_heart", default: 0
    t.integer "gsr4_heart", default: 0
    t.integer "gsr5_heart", default: 0
    t.integer "gsr6_heart", default: 0
    t.datetime "endtime_gsr1", default: "2017-09-06 05:23:13"
    t.datetime "endtime_gsr2", default: "2017-09-06 05:23:13"
    t.datetime "endtime_gsr3", default: "2017-09-06 05:23:13"
    t.datetime "endtime_gsr4", default: "2017-09-06 05:23:13"
    t.datetime "endtime_gsr5", default: "2017-09-06 05:23:13"
    t.datetime "endtime_gsr6", default: "2017-09-06 05:23:13"
    t.integer "pupspoilerusedp1", default: [], array: true
    t.integer "pupspoilerusedp2", default: [], array: true
    t.integer "pupspoilerusedp3", default: [], array: true
    t.integer "pupspoilerusedp4", default: [], array: true
    t.integer "pupspoilerusedp5", default: [], array: true
    t.integer "pupspoilerusedp6", default: [], array: true
    t.boolean "pupneutralused1", default: [], array: true
    t.boolean "pupneutralused2", default: [], array: true
    t.boolean "pupneutralused3", default: [], array: true
    t.boolean "pupneutralused4", default: [], array: true
    t.boolean "pupneutralused5", default: [], array: true
    t.boolean "pupneutralused6", default: [], array: true
    t.index ["gamestatus"], name: "index_games_on_gamestatus"
    t.index ["giver_id"], name: "index_games_on_giver_id"
    t.index ["gsr1_score"], name: "index_games_on_gsr1_score"
    t.index ["gsr1_status"], name: "index_games_on_gsr1_status"
    t.index ["gsr2_score"], name: "index_games_on_gsr2_score"
    t.index ["gsr2_status"], name: "index_games_on_gsr2_status"
    t.index ["gsr3_score"], name: "index_games_on_gsr3_score"
    t.index ["gsr3_status"], name: "index_games_on_gsr3_status"
    t.index ["gsr4_score"], name: "index_games_on_gsr4_score"
    t.index ["gsr4_status"], name: "index_games_on_gsr4_status"
    t.index ["gsr5_score"], name: "index_games_on_gsr5_score"
    t.index ["gsr5_status"], name: "index_games_on_gsr5_status"
    t.index ["gsr6_score"], name: "index_games_on_gsr6_score"
    t.index ["gsr6_status"], name: "index_games_on_gsr6_status"
    t.index ["guesser_id1"], name: "index_games_on_guesser_id1"
    t.index ["guesser_id2"], name: "index_games_on_guesser_id2"
    t.index ["guesser_id3"], name: "index_games_on_guesser_id3"
    t.index ["guesser_id4"], name: "index_games_on_guesser_id4"
    t.index ["guesser_id5"], name: "index_games_on_guesser_id5"
    t.index ["guesser_id6"], name: "index_games_on_guesser_id6"
  end

  create_table "news", force: :cascade do |t|
    t.integer "newstype", default: 0
    t.integer "targetuser_id", default: 0
    t.integer "giveruser_id", default: 0
    t.integer "targetgame_id", default: 0
    t.integer "seen", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "points", default: 0
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "provider"
    t.string "about"
    t.integer "sound", default: 1
    t.string "uid"
    t.string "theme", default: "theme-default"
    t.string "avatar_file_name"
    t.string "avatar_content_type", default: "bg:004-head:002-mouth:003-eyes:002-deco:000-hair:002"
    t.integer "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer "lifetimegamesgiver", default: 0
    t.integer "lifetimegamesguesser", default: 0
    t.integer "lifetimehearts", default: 0
    t.integer "heartnotify", default: 0
    t.integer "giverdeletegamesleft", default: 0
    t.integer "lifetimecheatgames", default: 0
    t.integer "lifetimecheatreports", default: 0
    t.integer "statgiverallsix", default: 0
    t.integer "statgiverscorehundred", default: 0
    t.integer "statgivernospoilers", default: 0
    t.integer "statgiverscoretwohundred", default: 0
    t.integer "statguesserallsix", default: 0
    t.integer "statguesserscorehundred", default: 0
    t.integer "statguesserscoretwohundred", default: 0
    t.integer "statgiverstatus", default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], array: true
    t.integer "statguesserstatus", default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], array: true
    t.integer "statgivernotify", default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], array: true
    t.integer "statguessernotify", default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], array: true
    t.integer "statalltimegiverstreak", default: 0
    t.integer "statgiverperfect", default: 0
    t.integer "statguesserperfect", default: 0
    t.integer "statguessernospoilers", default: 0
    t.integer "statalltimeguesserstreak", default: 0
    t.integer "pupspoilerdetector", default: 3
    t.integer "pupneutraltworemove", default: 3
    t.integer "lifetimepointsguesser", default: 0
    t.float "averagepointsguesser", default: 0.0
    t.integer "lifetimepointsgiver", default: 0
    t.integer "lifetimeplayedgamesgiver", default: 0
    t.float "averagepointsgiver", default: 0.0
    t.float "averagehearts", default: 0.0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
