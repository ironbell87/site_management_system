$(document).ready(function () {
    // initialize
    initialize();

    $(document.body).on("click", "#btn_login", function () {
        // change login name
        if ($("#spn_login").text() == "원청_101동_기사") sessionStorage.login_name = "철근_작업반장";
        else sessionStorage.login_name = "원청_101동_기사";

        // update login name
        $("#spn_login").text(sessionStorage.login_name);
    });

    $("#div_hrz_menu > ul > li > span").click(function () {
        switch ($(this).text()) {
            case "메세지": window.location.href("01.message.html"); break;
            case "인력": window.location.href("02.worker.html"); break;
            case "자재": break;
            case "장비": break;
            case "물량": break;
            case "예산": break;
        }
        //$("#div_hrz_menu > ul > li > span").removeClass("active");
        //$(this).addClass("active");
    });
});

function initialize() {
    // show dynamically header
    $('#header_space').append(
        '<h3>현장관리시스템(site management system, SMS)' +
            '<input id="btn_login" type="button" value="로그인" />' +
            '<span id="spn_login">원청_101동_기사</span>' +
            '<span id="spn_work"></span>' +
        '</h3>');

    // login
    if (sessionStorage.login_name == undefined) sessionStorage.login_name = "원청_101동_기사";
    $("#spn_login").text(sessionStorage.login_name);

    // default for part and process
    set_work_name();
}

function set_work_name(p_part_name, p_process_name) {
    if (typeof p_part_name != "undefined") {
        //if (sessionStorage.part == undefined) sessionStorage.part = "";
        sessionStorage.part = p_part_name;
    }
    if (typeof p_process_name != "undefined") {
        //if (sessionStorage.process == undefined) sessionStorage.process = "";
        sessionStorage.process = p_process_name;
    }
    $("#spn_work").text(sessionStorage.part + " :::: " + sessionStorage.process + " :::: " + sessionStorage.task);
}

function add_options(p_mom_selector, p_items, p_is_json) {
    ////======================================================
    //// usage of this function
    ////======================================================
    //var arr = [];
    //var len = 10;
    //for (var i = 0; i < len; i++) {
    //    arr.push({
    //        value: "value_" + i,
    //        text: "text_" + i
    //    });
    //}
    //add_options(".ui_space", "test", arr, false);

    ////======================================================
    //// usage of this function
    ////======================================================
    //var items_json = { options : [
    //{ value:"John" , text:"Doe" },
    //{ value:"Anna" , text:"Smith" },
    //{ value:"Peter" , text:"Jones" } ]};
    //add_options(".ui_space", items_json, true);

    if (p_is_json == true)
        p_items = p_items.options;

    p_items.forEach(function (item, i) {
        $(p_mom_selector).append($("<option>", {
            value: item.value,
            text: item.text
        }));
    });
}

function add_checkboxes(p_mom_selector, p_id, p_items, p_is_json) {
    ////======================================================
    //// usage of this function
    ////======================================================
    //var arr = [];
    //var len = 10;
    //for (var i = 0; i < len; i++) {
    //    arr.push({
    //        id: "id_" + i,
    //        'class': "class_" + i,
    //        value: "value_" + i,
    //        text: "text_" + i
    //    });
    //}
    //add_checkboxes(".ui_space", "test", arr, false);

    ////======================================================
    //// usage of this function
    ////======================================================
    //var items_json = { checkboxes : [
    //{ id:"id_1", class:"class_1", value:"John", text:"Doe" },
    //{ id:"id_2", class:"class_2", value:"Anna", text:"Smith" },
    //{ id:"id_3", class:"class_3", value:"Peter", text:"Jones" } ]};
    //add_checkboxes(".ui_space", "test", items_json, true);

    if (p_is_json == true)
        items = p_items.checkboxes;

    items.forEach(function (item, i) {
        $(p_mom_selector).append($("<input />", {
            type: 'checkbox',
            id: item.id,
            'class': item.class,
            value: item.value
        }));
        $(p_mom_selector).append($("<label />", {
            'for': item.id,
            text: item.text
        }));
        $(p_mom_selector).append($("<br />"));
    });
}

function add_u_lists(parentElement, p_class, p_items) {
    var i, ul, list;
    if (!p_items || !p_items.length) { return; } // return here if there are no items
    ul = $('<ul class="' + p_class + '"></ul>').appendTo(parentElement);
    for (i = 0; i < p_items.length; i++) {
        if (i == p_items.length - 1) list = $('<li class="last_child"></li>').text(p_items[i].title);
        else list = $('<li></li>').text(p_items[i].title);
        list.attr('id', p_items[i].ids);
        add_u_lists(list, p_class, p_items[i].children);
        ul.append(list);
    }
    return ul;
}

function get_cur_text(p_selector) {
    var cur_text = $(p_selector).clone().children().remove().end().text();
    var idx = cur_text.indexOf("\n");
    if (idx !== -1) cur_text = cur_text.substring(0, idx);
    return cur_text;
}

function find_insert_tree(p_source, p_id, p_child_val) {
    var item, i;
    for (i = 0; i < p_source.length; i++) {
        item = p_source[i];
        //alert(i + " : " + item.title);
        if (item.ids == p_id) {
            if (item.children) {
                item.children.push({ title: p_child_val, ids: p_id + "_" + (item.children.length + 1)});
            }
            else {
                item.children = [{ title: p_child_val, ids: p_id + "_1" }]; // first children
            }
            return true;
        }

        if (item.children) {
            var sub_result = find_insert_tree(item.children, p_id, p_child_val);
            if (sub_result) return true;
        }
    }
    return false;
}

function set_cur_color(p_total_selector, p_cur_selector) {
    $(p_total_selector).css("color", ""); // set all to default color
    $(p_cur_selector).css("color", "mediumvioletred"); // set cur to the selected color
}