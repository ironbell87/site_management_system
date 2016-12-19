$(document).ready(function () {
    // initialize
    worker_initialize();

    $("#ul_task_tree li").click(function () {
        // get cur task
        sessionStorage.task = $(this).clone().children().remove().end().text();
        $("#spn_work").text(sessionStorage.part + " :::: " + sessionStorage.process + " :::: " + sessionStorage.task);

        // set cur process color
        set_cur_color("#ul_task_tree li", this);
        return false; // stop propagation
    });

    $("#ul_task_tree li").dblclick(function () {
        // get cur process
        sessionStorage.task = $(this).clone().children().remove().end().text();
        $("#spn_work").text(sessionStorage.part + " :::: " + sessionStorage.process + " :::: " + sessionStorage.task);

        // set text and value of #opt_task
        switch (sessionStorage.task) {
            case "개시지시": $("#opt_task").val("start_order"); break;
            case "진도검토": $("#opt_task").val("progress_check"); break;
            case "결과검토": $("#opt_task").val("result_check"); break;
            case "완료확인": $("#opt_task").val("finish_confirm"); break;
        }
        $("#opt_task").text(sessionStorage.task);

        // modal dialog box with message.html
        //w3IncludeHTML();
        initialize_new_message();
        $("#modal_bg_space").show();

        // set cur process color
        set_cur_color(".task_tree li", this);
        return false; // stop propagation
    });

    $("#ul_tree li").click(function () {
        // get cur text
        var cur_text = get_cur_text(this);

        // set cur worker
        sessionStorage.worker = cur_text;
        $("#work_space").children().hide();
        if (cur_text == "전체") $("#total_worker").show();
        else if (cur_text == "가설") $("#temporary_worker").show();
        else if (cur_text == "골조공사") $("#RC_worker").show();
        else if (cur_text == "철근배근") $("#rebar_worker").show();
        else if (cur_text == "거푸집") $("#form_worker").show();
        else if (cur_text == "콘크리트타설") $("#conc_worker").show();
        else if (cur_text == "조적공사") $("#masonry_worker").show();
        else if (cur_text == "미장공사") $("#interior_worker").show();
        else $("#total_worker").show();

        // set cur worker color
        set_cur_color("#ul_tree li", this);
        return false; // stop propagation
    });
});

function worker_initialize() {
    // worker tree
    var worker_tree_json = [
        { title: "전체" }, { title: "공사부위" }, { title: "공정" }
    ];
    //if (sessionStorage.part_tree != undefined) {
    //    worker_tree_json[1].children = JSON.parse(sessionStorage.part_tree);
    //}
    //if (sessionStorage.process_tree != undefined) {
    //    worker_tree_json[2].children = JSON.parse(sessionStorage.process_tree);
    //}
    sessionStorage.worker_tree = JSON.stringify(worker_tree_json);
    var list = add_u_lists($("#ul_tree").children(), "collapsible_list", JSON.parse(sessionStorage.worker_tree));
}
