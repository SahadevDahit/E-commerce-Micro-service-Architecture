## E-commerce fullStack Web Application

![Alt text](<System diagram.png>)

## Tech stack: MERN stack

frontend :NextJs with typescript
backend :Nodejs with express
database :mongoDB
and bootstrap

## Architecture : MicroService Architecture

## steps

1. clone this repository
2. cd <microservice name> //for eg cd Api Gateway and npm install
3. setup the requirement as following
   3.0. Nodejs
   3.1. MongoDB Atlas
   3.2. setup RabbitMQ messageBroker (search:- how to setup RabbitMQ)
4. run command "nodemon server.js" in each microservices folder except frontend but use npm run dev
5. setup cloudinary for the images store
6. just figure out the .env.txt and properly setup .env keys as required

further steps
There are three user roles:- Admin , Seller and customer
step1: just create a user and through database change the role as admin to create admin user
step2: then create seller user through signup and click for business option to create seller user.
step3: now you can login into your account and start buying products from our website.
-> seller user need to be authorized to true by the admin to login as valid seller user and
setp4: For customer user just you can create account through the signup

features

1. User Management with JWT and bycript.js
2. product Management
3. Cart Management
4. Order Management
5. Admin Control Management
6. Search with proper pagination and filtration
7. Coupon and discount management (coupon is valid only for the products created by same seller as of coupon)
8. Profile management

Further feature remaining and will be in next commit

1. Payment integration
2. Deployment(CI/CD pipeline with docker and kuberneetes in cloud computing)
