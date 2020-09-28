api = (function () {

    return {
         getFunctionsByCinema: function(cinema_name, callback) {
            //http://localhost:8080/cinemas/{cinemaName}
            $.getJSON("http://localhost:8080/cinemas/" + cinema_name, function (data) {
                callback(data);
            });
        },
    
        getFunctionsByCinemaAndDate: function(cinema_name, fdate, callback) {
            //http://localhost:8080/cinemas/{cinemaName}/{date}
            $.getJSON("http://localhost:8080/cinemas/" + cinema_name +"/"+ fdate, function (data) {
                callback(data);
            });
        },
    
        getFunctionByCinemaMovieAndDate: function (cinema_name, fdate, movie_name, callback){
            //http://localhost:8080/cinemas//{cinemaName}/{date}/{movieName}
            $.getJSON("http://localhost:8080/cinemas/"+cinema_name+"/"+ fdate+"/"+movie_name, function (data) {
                callback(data);
            });
        },

         putFunction: function(cinema_name, new_function, callback) {

                var cinemaFunction = JSON.stringify(new_function);

                const promise = new Promise((resolve, reject) => {
                    $.ajax({
                        url: "http://localhost:8080/cinemas/" + cinema_name,
                        type: 'PUT',
                        data: cinemaFunction,
                        contentType: "application/json"
                    }).done(function () {
                        resolve('SUCCESS');

                    }).fail(function (msg) {
                        reject('FAIL');
                    });
                });

                promise
                    .then(res => {
                        callback();
                    })
                    .catch(error => {
                        alert(error);
                    });

         },

         postFunction: function(cinema_name, f, callback){
            var cinemaFunction = JSON.stringify(f);
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: "http://localhost:8080/cinemas/" + cinema_name,
                    type: 'PUT',
                    data: cinemaFunction,
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });

            promise
                .then(res => {
                    callback();
                })
                .catch(error => {
                    alert(error);
                });
         },

         deleteFunction: function(cinema_name, f, callback){
            var cinemaFunction = JSON.stringify(f);
            const promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: "http://localhost:8080/cinemas/" + cinema_name,
                    type: 'DELETE',
                    data: cinemaFunction,
                    contentType: "application/json"
                }).done(function () {
                    resolve('SUCCESS');
                }).fail(function (msg) {
                    reject('FAIL');
                });
            });

            promise
                .then(res => {
                    callback();
                })
                .catch(error => {
                    alert(error);
                });
         },

    }
})();