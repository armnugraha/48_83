# Nikreuh-nodejs

Nikreuh Backend with NodeJS + ExpressJS + Sequelize

first run
1. clone
2. npm i
3. sequelize
4. npm run start
5. sequelize db:migrate
6. sequelize db:seed:all

Merge From BtBckt
sequelize db:migrate:undo:all
sequelize db:seed:undo:all

Install Bcrypt
npm install bcrypt --save

make model + migration
https://medium.com/@arisupriatna/belajar-sequelize-0-e7dca1f16cde

sequelize model:generate --name roles --attributes name:string
sequelize seed:generate --name mount-seeder
sequelize seed:generate --name mount-file-seeder
sequelize seed:generate --name mount-review-seeder
sequelize seed:generate --name mount-review-file-seeder
sequelize seed:generate --name gears
sequelize seed:generate --name gear_items
sequelize seed:generate --name outdoor_gears

sequelize seed:generate --name category-seeder
sequelize seed:generate --name product-seeder
sequelize seed:generate --name company-seeder

sequelize seed:generate --name progress_statuses-seeder
sequelize seed:generate --name unit_statuses-seeder
sequelize seed:generate --name settings-seeder

## Seed by class
sequelize db:seed --seed 20200313080537-user-seeder
sequelize db:seed --seed 20200412025202-mount-review-seeder
sequelize db:seed --seed 20200329020737-mount-seeder
sequelize db:seed --seed 20200529084203-gears
sequelize db:seed --seed 20200529084206-gear_items
sequelize db:seed --seed 20200529084213-outdoor_gears

sequelize model:generate --name mounts --attributes user_id:integer,name:string,address:string,altitude:integer,rank:integer,thumb:text,type:string,desc:string,price:integer,start_time:date,end_time:date,full_time:boolean,start_date:date,end_date:date,status_open:boolean,center_coordinate:string

sequelize model:generate --name mount_files --attributes mount_id:integer,file:text

sequelize model:generate --name mount_reviews --attributes mount_id:integer,user_id:integer,rate:float,desc:string

sequelize model:generate --name mount_review_files --attributes mount_id:integer,file:text

sequelize model:generate --name outdoor_gears --attributes mount_id:integer,name:string
sequelize migration:create --name modify_outdoor_gears_add_new_fields #Add Field In Migration > sequelize db:migrate

sequelize migration:create --name modify_users_add_new_fields

sequelize model:generate --name gear_items --attributes gear_id:integer,name:string,weight:integer,condition:integer,type:integer,capacity:string

sequelize model:generate --name gears --attributes name:string

sequelize model:generate --name mount_announcements --attributes mount_id:integer,title:string,note:string,start_date:date,end_date:date,file:text

sequelize model:generate --name settings --attributes name:string,value:string

## Tutorial Sequelize Crud
https://medium.com/skyshidigital/membuat-restful-api-menggunakan-express-dan-sequelize-ef0e10da36ff
https://blog.soshace.com/create-simple-pos-with-react-node-and-mongodb-4-optimize-app-and-setup-deployment-workflow/?fbclid=IwAR3orw-eQ8supSE-DEUp5RrX4CBpofKJyCeSdCeDkzxAf8SMGVCkxVq9SBY

## Problem
connection reset by cors
https://jonathanmh.com/how-to-enable-cors-in-express-js-node-js/
https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue

## Tutorial
https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66
https://www.sitepoint.com/build-simple-beginner-app-node-bootstrap-mongodb/?fbclid=IwAR0LYMY5EBLRvBL8L7RoWkmliaRT_3Ju3do3DJh-wCgr7Evf5QY1chM1Ayo
https://itnext.io/back-end-pagination-with-nodejs-expressjs-mongodb-mongoose-ejs-3566994356e0
https://dev.to/raymag/build-a-quiz-rest-api-with-nodejs-2p64?fbclid=IwAR0UgB6PpdLJLXO54y0YJGK4nqg4qT0mojia5tnfyIyb8_sMKyrWPJ30xps
https://github.com/hariom282538/NodeJS-CRUD
https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
https://github.com/the-benchmarker/web-frameworks/blob/master/README.md?fbclid=IwAR37L2uve1AitvwVezICC-eNCR8eF1pk8Pjn_KSwd3BRm7nqQkdNQ29Cmi8

## TUTORIAL V2
Install package sequelize global
Sequelize
https://sequelize.readthedocs.io/en/latest/docs/getting-started/

## Basic Query Sequelize
https://sequelize.org/master/manual/querying.html#where
https://sequelize.org/master/manual/model-querying-basics.html
http://zetcode.com/javascript/sequelize/

## Query with if
https://stackoverflow.com/questions/41531405/how-to-make-if-condition-in-nodejs-sequelize-model-query

## Full Text Search
https://medium.com/riipen-engineering/full-text-search-with-sequelize-and-postgresql-3572cb3093e7

## Add Field
https://dev.to/nedsoft/add-new-fields-to-existing-sequelize-migration-3527

## Weather
https://openweathermap.org/weather-conditions

## Gears
https://my-best.id/28993

https://stackoverflow.com/questions/26836146/how-to-sort-array-items-by-longitude-latitude-distance-in-javascripts

https://github.com/rotaready/moment-range
https://cloud.githubusercontent.com/assets/21040043/24750025/8c8d044e-1aef-11e7-8fd7-7d64431af7e4.png

https://stackoverflow.com/questions/20943089/how-to-convert-unix-timestamp-to-calendar-date-moment-js


##BASE64
https://www.npmjs.com/package/js-base64