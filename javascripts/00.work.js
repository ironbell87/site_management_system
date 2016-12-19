$(document).ready(function () {
    // initialize
    work_initialize();

    $(".btn_import").click(function () {
        // get id of this
        var ids = $(this).attr("id");

        // add tree
        switch (ids) {
            case "btn_part_BH":
                add_part_tree();
                break;
            case "btn_part_MSP":
                if ($("#img_work").css("display") == "none") {
                    // show file open dialog
                    $("#show_file_open_dlg").click(); //var file_name = $(this)[0].files[0].name; // get file name
                    $("#img_work").show();
                }
                add_part_tree();
                break;
            case "btn_process_WBS":
                // show file open dialog
                $("#show_file_open_dlg").click();
                add_process_tree();
                break;
            case "btn_process_MSP":
                if ($("#img_work").css("display") == "none") {
                    // show file open dialog
                    $("#show_file_open_dlg").click();
                    $("#img_work").show();
                }
                add_process_tree();
                break;
        }
    });

    // click event on dynamically generated element
    $(document.body).on("click", "#ul_part_tree li", function () {
        // get cur part
        var cur_part = $(this).clone().children().remove().end();
        sessionStorage.part_id = cur_part.attr("id");
        set_work_name(cur_part.text(), undefined);

        // set cur part color
        set_cur_color("#ul_part_tree li", this);
        return false; // stop propagation
    });

    // click event on dynamically generated element
    $(document.body).on("click", "#ul_process_tree li", function () {
        // get cur process
        var cur_process = $(this).clone().children().remove().end();
        sessionStorage.process_id = cur_process.attr("id");
        set_work_name(undefined, cur_process.text());

        // set cur process color
        set_cur_color("#ul_process_tree li", this);
        return false; // stop propagation
    });

    $("#btn_add_work").click(function () {
        if (sessionStorage.part == "") { alert("공사부위를 선택하세요!"); return; }
        if (sessionStorage.process == "") { alert("공정을 선택하세요!"); return; }
        sessionStorage.work_to_add = sessionStorage.part + " :::: " + sessionStorage.process;
        window.history.back();
    });

    $("#ul_task_tree li").click(function () {
        // get cur task
        sessionStorage.task = $(this).clone().children().remove().end().text();
        sessionStorage.task_id = $(this).clone().children().remove().end().attr("id");
        $("#spn_work").text(sessionStorage.part + " :::: " + sessionStorage.process + " :::: " + sessionStorage.task);

        // set cur task color
        set_cur_color("#ul_task_tree li", this);
        return false; // stop propagation
    });

    // right-click on img_part
    $("#img_part").contextmenu(function (event) {
        event.preventDefault();
        $(".cntx_menu > ul").css({ "display": "block", "left": (event.pageX) + "px", "top": (event.pageY) + "px" });
        return false;
    });

    // right-click on img_part
    $("#ul_part_tree li").contextmenu(function (event) {
        // get cur part
        var cur_part = $(this).clone().children().remove().end();
        sessionStorage.part_id = cur_part.attr("id");
        set_work_name(cur_part.text(), undefined);

        // set cur part color
        set_cur_color("#ul_part_tree li", this);

        // show context menu
        event.preventDefault();
        if ($("#img_part").css("display") != "none")
            $(".cntx_menu > ul").css({ "display": "block", "left": (event.pageX) + "px", "top": (event.pageY) + "px" });
        return false;
    });

    // right-click on img_process
    $("#img_work").contextmenu(function (event) {
        event.preventDefault();
        $(".cntx_menu > ul").css({ "display": "block", "left": (event.pageX) + "px", "top": (event.pageY) + "px" });
        return false;
    });

    // right-click on img_process
    $("#ul_process_tree li").contextmenu(function (event) {
        // get cur process
        var cur_process = $(this).clone().children().remove().end();
        sessionStorage.process_id = cur_process.attr("id");
        set_work_name(undefined, cur_process.text());

        // set cur process color
        set_cur_color("#ul_process_tree li", this);

        // show context menu
        event.preventDefault();
        if ($("#img_work").css("display") != "none")
            $(".cntx_menu > ul").css({ "display": "block", "left": (event.pageX) + "px", "top": (event.pageY) + "px" });
        return false;
    });

    // left-click on other area of img_process; hide menu
    $("*").click(function (event) {
        $(".cntx_menu > ul").hide();
    });

    // right-click on menu itself; do nothing; prevent default action
    $("*").contextmenu(function (event) {
        event.preventDefault();
        return false;
    });

    // left-click on selected menu
    $(".menu_terminal").click(function (event) {
        // hide menu itself
        $(".cntx_menu > ul").hide();

        // prepare common variables
        var flag = $(this).text(); // determine part or process
        var new_name = prompt("새 이름 입력 : ", "새 이름");

        // prepare variables for part
        var mom_id = sessionStorage.part_id;
        var tree_json = JSON.parse(sessionStorage.part_tree); // make string in sessionStorage to JSON
        var mom_selector = "#ul_part_tree";

        // prepare variables for process
        if (flag == "공정 추가") {
            mom_id = sessionStorage.process_id;
            tree_json = JSON.parse(sessionStorage.process_tree);
            mom_selector = "#ul_process_tree";
        }
        if (mom_id == undefined) return false;

        // add item to the existing tree
        find_insert_tree(tree_json, mom_id, new_name); // add item to json
        $(mom_selector).children().children().empty(); // empty the existing tree
        var list = add_u_lists($(mom_selector).children(), "collapsible_list", tree_json); // add json to tree
        if (flag == "공사부위 추가") sessionStorage.part_tree = JSON.stringify(tree_json); // make JSON to string in sessionStorage
        else sessionStorage.process_tree = JSON.stringify(tree_json); // make JSON to string in sessionStorage

        // return
        return false;
    });
});

function work_initialize() {
    // project tree
    if (sessionStorage.part_tree != undefined)
        var list = add_u_lists($("#ul_part_tree").children(), "collapsible_list", JSON.parse(sessionStorage.part_tree), "part");
    else
        $("#show_file_open_dlg").click(); // to select BuilderHub file

    // process tree
    if (sessionStorage.process_tree != undefined) {
        $("#img_work").show();
        var list = add_u_lists($("#ul_process_tree").children(), "collapsible_list", JSON.parse(sessionStorage.process_tree), "process");
    }

    // set cur part and process color
    if (sessionStorage.part_id != undefined) set_cur_color("#ul_part_tree li", "#" + sessionStorage.part_id);
    if (sessionStorage.process_id != undefined) set_cur_color("#ul_process_tree li", "#" + sessionStorage.process_id);
}

function add_part_tree() {
    // empty old
    $("#ul_part_tree").children().children().empty();

    // add new to json
    if (sessionStorage.part_tree == undefined) {
        var part_tree_json = [
            { title: "동기준", ids: "part_1", children: [
                    { title: "A동", ids: "part_1_1" },
                    { title: "B동", ids: "part_1_2" },
                    { title: "C동", ids: "part_1_3" }]
            },
            { title: "층기준", ids: "part_2", children: [
                    { title: "1층", ids: "part_2_1" },
                    { title: "2층", ids: "part_2_2" },
                    { title: "3층", ids: "part_2_3" },
                    { title: "4층", ids: "part_2_4" }]
            },
            { title: "작업기준", ids: "part_3" }
        ];
        sessionStorage.part_tree = JSON.stringify(part_tree_json);
    }

    // add json to list
    var list = add_u_lists($("#ul_part_tree").children(), "collapsible_list", JSON.parse(sessionStorage.part_tree));
};

function add_process_tree() {
    // empty old
    $("#ul_process_tree").children().children().empty();

    // add new to json
    if (sessionStorage.process_tree == undefined) {
        var process_tree_json = [
            { title: "건축공사", ids: "process_1", children: [
                { title: "골조공사", ids: "process_1_1", children: [
                    { title: "철근배근", ids: "process_1_1_1", children: [
                        { title: "가공", ids: "process_1_1_1_1" },
                        { title: "조립", ids: "process_1_1_1_2" },
                        { title: "설치", ids: "process_1_1_1_3" },
                        { title: "주문", ids: "process_1_1_1_4" }
                    ]},
                    { title: "거푸집", ids: "process_1_1_2" },
                    { title: "콘크리트타설", ids: "process_1_1_3" }
                ]},
                { title: "조적공사", ids: "process_1_2" },
                { title: "미장공사", ids: "process_1_3" }
            ]},
            { title: "전기공사", ids: "process_2" },
            { title: "기계공사", ids: "process_3" }
        ];
        sessionStorage.process_tree = JSON.stringify(process_tree_json);
    }

    // add json to list
    var list = add_u_lists($("#ul_process_tree").children(), "collapsible_list", JSON.parse(sessionStorage.process_tree));
};
