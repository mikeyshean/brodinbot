# Schema Information

## users
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
phone_number       | integer    | not null, unique
first_name              | string    |
last_name              | string    |
session_token      | string    | not null, unique, index

# Messaging Schema

## messages
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
body               | text    | not null
user_id            | integer    |
response_id        | integer    | foreign key (references responses)

## responses
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
body               | text      | not null
workflow_id        | integer   | foreign key (references workflows)
index              | integer   | not null, default 0 (indicates workflow sequence#)


## workflows
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
name               | text      | not null
category           | integer   | foreign key (references workflow_categories)
is_active          | boolean   | not null, default true (1)


# Fitness Schema

## exercises
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | integer   | not null

## muscle_groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

## muscle_group_exercises
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
muscle_group_id    | integer   | not null, foreign key (references muscle_groups), index
exercise_id | integer   | not null, foreign key (references exercises), index

## sets
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
set         | integer    | not null
reps        | integer    |
duration    | integer    |
exercise_id | integer    | not null, foreign key (references exercises)
user_id     | integer   | not null, foreign key (references users), index

## routines
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | text      | not null
user_id    | integer   | not null, foreign key (references users), index

## routine_exercises
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
routine_id   | integer      | not null, foreign key (references routines)
exercise_id    | integer   | not null, foreign key (references exercises)
