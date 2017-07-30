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

ActiveRecord::Schema.define(version: 20170730065228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer "gsr1_score"
    t.integer "gsr2_score"
    t.integer "gsr3_score"
    t.string "gamename", default: ""
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
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
