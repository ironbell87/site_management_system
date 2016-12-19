$(document).ready(function () {
    // initialize
    message_initialize();

    $("#ul_tree li").click(function () {
        // get cur text
        var cur_text = get_cur_text(this);;

        // set cur worker
        sessionStorage.worker = cur_text;
        $("#work_space").children().hide();
        if (cur_text == "전체") $("#div_total").show();
        else if (cur_text == "수발신") $("#div_delivery").show();
        else if (cur_text == "완료여부") $("#div_complete").show();
        else if (cur_text == "골조공사") $("#div_process").show();
        else if (cur_text == "협력업체") $("#div_subcon").show();
        else $("#div_total").show();

        // set cur message color
        set_cur_color("#ul_tree li", this);
        return false; // stop propagation
    });

    $("#work_space li").dblclick(function () {
        // check if children
        if ($(this).children().length > 0) return false;

        // get cur text
        var msg_str = $(this).clone().children().remove().end().text();
        var time_str = msg_str.split(" :::: ")[0];

        // find selected message
        var message_json = JSON.parse(sessionStorage.message);
        for (i = 0; i < message_json.length; i++) {
            if (message_json[i].time_stamp.time == time_str) {
                var cur_message_json = message_json[i]; break;
            }
        }

        // modal dialog box with message.html
        initialize_existing_message(cur_message_json);
        $("#modal_bg_space").show();

        // set cur process color
        set_cur_color("#work_space li", this);
        return false; // stop propagation
    });

    $("#btn_send_message").click(function() {
        // modal dialog box with message.html
        initialize_new_message();
        $("#modal_bg_space").show();
    });
});

function message_initialize() {
    // generate message tree json
    var message_tree_json = [
        { title: "수발신" },
        { title: "완료여부" },
        { title: "협력업체" }
    ];
    //if (sessionStorage.part_tree != undefined) {
    //    message_tree_json[3].children = JSON.parse(sessionStorage.part_tree);
    //}
    //if (sessionStorage.process_tree != undefined) {
    //    message_tree_json[4].children = JSON.parse(sessionStorage.process_tree);
    //}

    // save json to session
    sessionStorage.message_tree = JSON.stringify(message_tree_json);

    // add json to list
    var list = add_u_lists($("#ul_tree").children(), "collapsible_list", JSON.parse(sessionStorage.message_tree));

    // add messages
    if (sessionStorage.message != undefined) {
        var msg_tree_json = [];
        var message = JSON.parse(sessionStorage.message);
        for (i = 0; i < message.length; i++) {
            msg_tree_json.push({ title: message[i].time_stamp.time + " :::: " + message[i].title.title });
        }
        add_u_lists($("#div_total"), "ul_message", msg_tree_json);
    }
    //CollapsibleLists.apply(); // for the existing collapsible tree in html
    ////CollapsibleLists.applyTo(list[0]); // [0] = DOM element from jQuery; list.get(0) is also possible; for dynamically generated collapsible tree
    //$("#div_hrz_menu > ul > li > span").removeClass("active");
    //$("#div_hrz_menu > ul > li:nth-child(1) > span").addClass("active");
}
