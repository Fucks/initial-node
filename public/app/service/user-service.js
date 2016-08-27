'use strict';
angular.module('app').factory("userService", function ($http) {
    return {
        load: function (page) {
            return $http.get("/api/users", {
                'params': {
                    'number': page.number,
                    'limit': page.limit
                }
            }).then(function (response) {
                return response;
            }, function (err) {
                return err.data.message;
            })
        },
        save: function (user) {
            return $http.post("/api/users", user).then(function (res) {
                return res;
            }, function (err) {
                return err.data.message;
            });
        },
        delete: function (id) {
            return $http.delete("/api/users/delete/" + id).then(function (res) {
                return res;
            }, function (err) {
                return err.data.message;
            })
        },
        find: function (id) {
            return $http.get("/api/users/find/" + id).then(function (res) {
                return res;
            }, function (err) {
                return err.data.message;
            });
        },
        authenticated: function () {
            return $http.get('/api/users/authenticated').then(function (res) {
                return res;
            }, function (err) {
                return err.data.message;
            })
        }
    }
})

