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

## workflow_responses
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
workflow_id        | integer   | foreign key (references workflows)
version            | integer   | not null, default 1
response_id        | integer   | foreign key (references workflows)
index              | integer   | not null, default 0 (indicates workflow sequence#)
parent_id          | integer   | foreign key (self referential)
trigger_id         | integer   | foreign key (references triggers)

## workflows
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
name               | text      | not null
category           | integer   | foreign key (references workflow_categories)
current_version    | integer   | not null, default 1
is_active          | boolean   | not null, default true

## triggers
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
category           | integer   | foreign key (references workflow_categories)

## trigger_strings
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
text               | string    | not null
trigger_id         | string    | not null, foreign key (references triggers)


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
