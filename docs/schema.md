# Schema Information

## users
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
phone_number       | integer    | not null, unique
first_name              | string    |
last_name              | string    |
session_token      | string    | not null, unique, index

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
