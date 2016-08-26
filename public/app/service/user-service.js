'use strict';
angular.module('app').factory("userService", function($http){
    return {
        load : function(page){
            return $http.get("/api/users", {'params':{'number' : page.number, 'limit' : page.limit}}).then(function(response){
                return response;
            }, function(err){
                return err;
            })
        },
        save : function(user){
            return $http.post("/api/users", user).then(function(res){
                return res;
            }, function(err){
                return err;
            });
        },
        delete : function(id){
            return $http.delete("/api/users/"+id).then(function(res){
                return res;
            }, function(err){
                return err;
            })
        },
        find : function(id){
            return $http.get("/api/users/"+id).then(function(res){
                return res;
            }, function(err){
                return err;
            });
        }
    }
})
