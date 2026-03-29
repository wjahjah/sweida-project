@echo off
echo ---------------------------------------------------
echo [1/3] Rolling back all migrations...
call npx knex migrate:rollback --all

echo [2/3] Running new migrations...
call npx knex migrate:latest

echo [3/3] Running seeds...
call npx knex seed:run

echo ---------------------------------------------------
echo Database has been reset and seeded successfully!
echo ---------------------------------------------------
pause