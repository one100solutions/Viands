[![Build Status](https://travis-ci.org/one100solutions/Viands.svg?branch=master)](https://travis-ci.org/one100solutions/Viands)
# Viands
Viands Retaurant api

##WORK IN PROGRESS

###COMPLETED:

> ##POST _/signup_
>>  * Request:  
    * email:  
    * password:  
    * phone:  
    * name:  

>> * Response:
   * err:  
   * message:

> ##POST _/verify_  
>>  * Request:
    * phone:
    * otp:  

>>  * Response:  
    * err:  
    * message:  

> ##POST _/login_  
>>  * Request:  
    * phone:  
    * password:  

>> * Response:
   * err:  
   * message:
   * user:

> ##GET _/restaurants_  
>>  

>> * Response:      
   * err:   
   * message:  
   * restaurants:  

> ##POST _/order_  
>> * Request:  
   * data: 

>> * Response:  
   * err:  
   * message:  
   * order_id:
   * order_type:
  
  **Note: data in request is**  
>>  * data = json encoded of {  
      * token:  
      * rest_id  
      * total_cost
      * order:  
      *   type:  
      *   time_deliver:  
      *   items:[{id: , quantity:, cost: }]  
    }

> ##POST _/resend_otp_  
>> * Request:    
   * phone:  
   * password:  

>> * Response:    
   * err:  
   * message:  

> ##POST _/user_orders_  
>> * Request:  
   * token:  

>> * Response:  
   * err:  
   * message:  
   * orders: 

##RESTAURANT API

> ##