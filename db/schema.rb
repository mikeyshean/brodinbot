# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160416163231) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "messages", force: :cascade do |t|
    t.text     "body",                 null: false
    t.integer  "user_id",              null: false
    t.integer  "user_workflow_id"
    t.integer  "workflow_response_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
  end

  create_table "responses", force: :cascade do |t|
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trigger_strings", force: :cascade do |t|
    t.string   "text",       null: false
    t.integer  "trigger_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "trigger_strings", ["trigger_id", "text"], name: "index_trigger_strings_on_trigger_id_and_text", unique: true, using: :btree
  add_index "trigger_strings", ["trigger_id"], name: "index_trigger_strings_on_trigger_id", using: :btree

  create_table "triggers", force: :cascade do |t|
    t.string   "category",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "triggers", ["category"], name: "index_triggers_on_category", unique: true, using: :btree

  create_table "user_workflows", force: :cascade do |t|
    t.integer  "workflow_id",                      null: false
    t.integer  "version",              default: 1, null: false
    t.integer  "message_id"
    t.integer  "workflow_response_id", default: 0, null: false
    t.integer  "user_id",                          null: false
    t.datetime "started_at"
    t.datetime "ended_at"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "user_workflows", ["user_id"], name: "index_user_workflows_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "phone_number", limit: 15, null: false
    t.string   "name_first"
    t.string   "name_last"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "users", ["phone_number"], name: "index_users_on_phone_number", using: :btree

  create_table "workflow_responses", force: :cascade do |t|
    t.integer  "workflow_id",                 null: false
    t.integer  "version",     default: 1,     null: false
    t.integer  "response_id",                 null: false
    t.integer  "parent_id"
    t.integer  "trigger_id"
    t.boolean  "terminates",  default: false, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "workflows", force: :cascade do |t|
    t.string   "name",                           null: false
    t.integer  "category"
    t.boolean  "is_active",       default: true, null: false
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.integer  "current_version", default: 1,    null: false
    t.integer  "parent_id"
  end

end
