app = (function (){

    var _cinema;
    var _date;
    var _functions;
    var _movieName;
    var _module = "js/apiclient.js";

    function _setCinemaName(cinema) {
        _cinema = cinema;
    };

    function _setDate(date) {
        _date = date.substring(0, 10);
    };

    function _updateFunctionsData(functions){
        _functions = [];
        functions.map(function (f) {
           _functions.push({movieName: f.movie.name, genre: f.movie.genre, hour: f.date.substring(11, 16)}); 
        });
        _updateTableData();
    }

    function _updateTableData(){
        $("#functionsTable > tbody").empty()
        _functions.map(function (movie) {
            var btn = "<button class='btn btn-outline-primary' value='Open Seats' onclick = 'app.openSeats(\"" + movie.movieName +'" , "' +
                    movie.hour +"\")'>Open Seats</button>";
            var fila = '<tr><td>' + movie.movieName + '</td><td>' + movie.genre + '</td><td>' + movie.hour + '</td><td>' + btn + '</tr>';
            $("#functionsTable > tbody").append(fila)
        })
        _showMovies();
    }

    function _showMovies(){
        $("#cinemaSelected").text("Cinema Selected: "+_cinema);
        $("#movies").text("Movies:");
        document.getElementById('functions').style.visibility = "visible";
    }

    function _updateSeats(f){
        if (f != null) {
            _clearCanvasSeats();
            $("#availabilityOf").text("Availability of: "+ f.movie.name);
            document.getElementById('Availability').style.visibility = "visible";
            var seats = f.seats;
            var c = document.getElementById("seatsCanvas");
            var ctx = c.getContext("2d");
            ctx.fillStyle = "#000000";
            ctx.fillRect(c.width*0.2, c.height*0.05, c.width*0.6, c.height*0.075);
            var x = c.width * 0.1; var y = c.height * 0.20;
            var w = (c.width) * 0.8; var h = (c.height) * 0.75;
            var l;
            if (w < h){
                l = w*0.8/seats[0].length;
            }else{
                l = h*0.8/seats.length;
            }
            var dx = (w - (l*seats[0].length)) / seats[0].length;
            var dy = (h - (l*seats.length)) /seats.length;

            seats.map(function (row){
                x = c.width * 0.1;
                row.map(function (seat){
                    ctx.fillStyle = "#333842";
                    if (!seat){
                        ctx.fillStyle = "#B40431";
                    }
                    ctx.fillRect(x, y, l, l);
                    x = x + l + dx;
                })
                y = y + l + dy;
            });
        }
    }

    function _clearCanvasSeats(){
        document.getElementById('Availability').style.visibility = "hidden";
        var canvas = document.getElementById("seatsCanvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
    }

    function _refreshFunctionsData(){
        $.getScript(_module, function(){
            api.getFunctionsByCinemaAndDate(_cinema, _date, _updateFunctionsData);
        });
    }

    function _updateFunction(f){
        f.date = _date+" "+$("#newHour").val();
        _hour = $("#newHour").val();
        $.getScript(_module, function () {
            api.putFunction(_cinema, f, _refreshFunctionsData);
        });
    }

    function _removeFunction(f){
        _clearCanvasSeats();
        $.getScript(_module, function () {
            api.deleteFunction(_cinema, f, _refreshFunctionsData);
        });
    }


    return{
        updateFunctions: function (cinema, date){
            if (cinema === "" || date === ""){
                alert("El nombre del cinema y la fecha son requeridos");
            }else{
                _setCinemaName(cinema);
                _setDate(date);
                $.getScript(_module, function(){
                    api.getFunctionsByCinemaAndDate(cinema, date, _updateFunctionsData);
                });
            }
        },

        openSeats: function (movieName, hour){
            _movieName = movieName;
            _hour = hour;
            $.getScript(_module, function(){
                api.getFunctionByCinemaMovieAndDate(_cinema,_date+" "+hour, movieName, _updateSeats);
            });
        },

        saveOrUpdateFunction: function (){
            $.getScript(_module, function(){
                api.getFunctionByCinemaMovieAndDate(_cinema,_date+" "+_hour, _movieName, _updateFunction);
            });
        },

        postFunction: function(){
            _clearCanvasSeats();
            var seats = [[true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true], [true, true, true, true, true, true, true, true, true, true, true, true]];
            var movieName = $("#Movie-name").val();
            var movieGenre = $("#Movie-genre").val();
            var date = _date+" "+$("#Function-hour").val();
            var f = {"movie": {"name": movieName, "genre": movieGenre}, "seats": seats, "date": date};
            $.getScript(_module, function(){
                api.postFunction(_cinema, f, _refreshFunctionsData);
            });
            $('#createFunction').modal('hide');
        },

        deleteFunction: function(){
            console.log(_movieName+"   "+_date+" "+_hour);
            _clearCanvasSeats();
            $.getScript(_module, function(){
                api.getFunctionByCinemaMovieAndDate(_cinema,_date+" "+_hour, _movieName, _removeFunction);
            });
        }
    }
})();