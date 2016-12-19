$(document).ready(function () {
    // initialize
    schedule_initialize();

    // select current work
    //$(document.body).on("click", ".collapsible_list > li", function () {
    $(".collapsible_list > li").click(function () {
        // check if children
        if ($(this).children().length > 0) return false;

        // set work name
        var names = get_cur_text(this).split(" :::: ");
        if (names.length > 1) set_work_name(names[0], names[1]);
        else set_work_name("", "");

        // set cur work color
        set_cur_color(".collapsible_list > li", this);
        return false;
    });

    // go to the details of the work
    $(".collapsible_list > li").dblclick(function () {
        // check if children
        if ($(this).children().length > 0) return false;

        // set work name and redirect
        var names = get_cur_text(this).split(" :::: ");
        if (names.length < 2) {
            set_work_name("", "");
        }
        else {
            set_work_name(names[0], names[1]);
            window.location.href("01.message.html"); // redirect
        }
        return false;
    });

    // show and hide context menu
    $(".collapsible_list > li").contextmenu(function (event) { // show menu
        if ($(this).parent(".tree_view").length == 0) {
            // set work name
            var names = get_cur_text(this).split(" :::: ");
            if (names.length > 1) set_work_name(names[0], names[1]);
            else set_work_name("", "");

            // set cur work color
            set_cur_color(".collapsible_list > li", this);

            // show menu
            $(".cntx_menu > ul").css({ "display": "block", "left": (event.pageX) + "px", "top": (event.pageY) + "px" });
            $(this).attr("id", "cur_list");
        }
        event.preventDefault();
        return false;
    });
    $("*").click(function (event) { // hide menu
        $(".cntx_menu > ul").hide();
    });
    $("*").contextmenu(function (event) { // right-click not on menu itself; do nothing; prevent default action
        event.preventDefault();
        return false;
    });

    // left-click on selected menu
    $(".menu_terminal").click(function (event) {
        // hide menu itself
        $(".cntx_menu > ul").hide();

        // go to work dialog box
        if ($(this).text() == "작업 추가") window.location.href("00.work.html"); // back button will work

        // return
        return false;
    });
});

function schedule_initialize() {
    // date, bg color for days
    var today = new Date(); // get current date
    var first = today.getDate() - today.getDay(); // date of sunday of this week
    var sunday = new Date(today); sunday.setDate(first); // get sunday
    var div_days = $("#schedule_space").children(); // get space of each day
    for (i = 0; i < 7; i++) {
        var cur_date = new Date(sunday);
        var date_string = new Date(cur_date.setDate(sunday.getDate() + i))
        	                .toLocaleDateString("kr-KR", { weekday: "long", month: "long", day: "numeric" }); // get weekday, month, date
        div_days.eq(i).children(".month_date_day").text(date_string); // set to span
        //if (date_string == today.toLocaleDateString("kr-KR", { weekday: "long", month: "long", day: "numeric" })) // if today
        if (i == today.getDay()) // if today
            div_days.eq(i).css("background-color", "lightcyan"); // set bg color
    }
    //CollapsibleLists.apply();

    // add work
    if (sessionStorage.work_to_add != undefined) {
        // get ul
        var mom_ul = $("#cur_list>ul:first-child");
        if (mom_ul.length == 0) {
            mom_ul = $('<ul class="collapsible_list"><ul>');
            $("#cur_list").append(mom_ul);
        }

        // set the existing last
        var son_li = mom_ul.children(":last-child");
        if (son_li.length > 0) son_li.removeClass("last_child");

        // add work
        var list = $('<li class="last_child"></li>').text(sessionStorage.work_to_add);
        mom_ul.append(list);

        //// delete added work
        //sessionStorage.removeItem("work_to_add");
    }
}
