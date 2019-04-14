$(document).ready(function () {

    var search = "election";
    var records = 1;
    // var startYear = 2019;

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&facet_field=day_of_week&facet=true&begin_date=20120101&end_date=20120101&api-key=cnlzBSEEjBmVFiePSVqxmCZK5ys2q1C9";


    //function build url
    function buildURL() {
        search = $("#search").val();

        var startYear = 2019;
        var endYear = 2019;

        if ($("#startYear").val()) {
            startYear = $("#startyear").val();
        }

        if ($("#endYear").val()) {
            endYear = $("#endyear").val();;
        }


        var startDate = startYear + "0101";
        var endDate = endYear + "1231";
        records = $("#nmbrecords").val();
        url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + search.replace(" ", "+") + "&facet_field=day_of_week&facet=true&begin_date=" + startDate + "&end_date=" + endDate + "&api-key=cnlzBSEEjBmVFiePSVqxmCZK5ys2q1C9";
    };



    //function ajax call
    function ajaxCall() {
        buildURL();
        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            $("#articles").empty();

            for (let i = 0; i < records; i++) {

                var head;
                var snip;
                var link;

                var img = $("<img>");
                var imgUrl = "https://static01.nyt.com/" + response.response.docs[i].multimedia[0].url;
                img.attr("src", imgUrl);
                img.attr("class", "card-img-top w-50");

                head = $("<h2>").html(response.response.docs[i].headline.main);
                head.attr("class", "card-title");


                snip = $("<p>").html(response.response.docs[i].snippet);
                snip.attr("class", "card-text");

                link = $("<a>").html("Read article here").attr("href", response.response.docs[i].web_url);
                link.attr("class", "btn btn-primary");
                link.attr("target", "_blank");

                var cardBody = $("<div>");

                cardBody.attr("class", "card-body");

                cardBody.append(head, snip, link);

                var card = $("<div>");
                card.attr("class", "card mt-3");

                card.append(img);
                card.append(cardBody);

                $("#articles").append(card);

            }


        });
    }

    //onclick calls for stuff
    $("#btn-search").on("click", function () {
        ajaxCall();
    })

    $("#btn-clear").on("click", function () {
        $("#articles").empty();
    })




});
