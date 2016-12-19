$(document).ready(function () {
    //// task
    //$(document).on("change","#sel_task",function() {
    //    switch (this.value) {
    //        case "bar_mv": // mv = move
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "single" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_mf": // mf = manufacturing
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "single" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_mf_mv":
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "single" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_fb": // fb = fabrication
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "single" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_fb_rq": // rq = request
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "multi" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_fb_cr": // cr = correction
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "multi" },
    //                    { opt_selector: "#opt_body_type", opt_value: "checklist" },
    //                    { opt_selector: "#opt_attach", opt_value: "yes_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "one_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        case "bar_fb_cr_rq":
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "multi" },
    //                    { opt_selector: "#opt_body_type", opt_value: "checklist" },
    //                    { opt_selector: "#opt_attach", opt_value: "yes_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "one_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //        default: //"bar_order":
    //            var task_msg_json = {
    //                msg_options: [
    //                    { opt_selector: "#opt_rcv", opt_value: "single" },
    //                    { opt_selector: "#opt_body_type", opt_value: "message" },
    //                    { opt_selector: "#opt_attach", opt_value: "no_attach" },
    //                    { opt_selector: "#opt_dir", opt_value: "two_way" },
    //                    { opt_selector: "#opt_target", opt_value: "rebar" }]
    //            };
    //            break;
    //    }
    //    set_msg_options(task_msg_json);
    //    message_modal_initialize();
    //    //$("#sel_task").focus();
    //});

    $("#sel_task").change(function () {
        switch (this.value) {
            case "commence":
                set_msg_options("opt_yes_ref", "opt_message", "opt_yes_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
            case "progress":
                set_msg_options("opt_no_ref", "opt_message", "opt_no_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
            case "result":
                set_msg_options("opt_no_ref", "opt_checklist", "opt_yes_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
            case "complete":
                set_msg_options("opt_no_ref", "opt_message", "opt_no_attach", "opt_write", "opt_no_reply", "opt_rebar"); break;
        }
        message_show_hide();
    });

    // receiver
    $("#sel_ref").change(function () {
        if (this.value == "opt_no_ref") $("#lst_ref").hide();
        else $("#lst_ref").show();
    });

    // message or checklist
    $("#sel_body_type").change(function () {
        if (this.value == "opt_message") $("#div_checklist").hide();
        else $("#div_checklist").show();
    });

    $(".cls_checklist").change(function () {
        var check_string = "";
        if ($("#ckl_1").is(":checked")) check_string += ":직경:";
        if ($("#ckl_2").is(":checked")) check_string += ":간격:";
        if ($("#ckl_3").is(":checked")) check_string += ":길이:";
        if ($("#ckl_4").is(":checked")) check_string += ":굽힘위치:";
        $("#txt_msg").val("철근의 {" + check_string + "}에 대한 긴급처리 요망");
    });

    // attach
    $("#sel_attach").change(function () {
        if (this.value == "opt_no_attach") $("#div_attach").hide();
        else $("#div_attach").show();
    });
    $("#btn_pic").click(function () {
        var is_hidden = $("#img_atch_pic").css("display");
        if (is_hidden == "none") $("#img_atch_dwg").css("margin-left", "0px");
        else $("#img_atch_dwg").css("margin-left", "327px");
        $("#img_atch_pic").toggle();
    });
    $("#btn_dwg").click(function () {
        var is_hidden = $("#img_atch_pic").css("display");
        if (is_hidden == "none") $("#img_atch_dwg").css("margin-left", "327px");
        else $("#img_atch_dwg").css("margin-left", "0px");
        $("#img_atch_dwg").toggle();
    });

    // status
    $("#sel_status").change(function () {
        if (this.value == "opt_write") {
            $(".modal_header").css("background-color", "rgb(157, 34, 60)");
            $("#div_write").show(); $("#div_read").hide();
        }
        else {
            $(".modal_header").css("background-color", "blue");
            $("#div_write").hide(); $("#div_read").show();
        }
    });

    // reply
    $("#sel_reply").change(function () {
        if (this.value == "opt_no_reply") { $("#btn_exe_now").hide(); $("#btn_exe_later").hide(); $("#btn_confirm").show(); }
        else { $("#btn_exe_now").show(); $("#btn_exe_later").show(); $("#btn_confirm").hide(); }
    });

    // target
    $("#sel_target").change(function () {
        if (this.value == "opt_rebar") $("#txt_msg").val("철근에 대한 긴급처리 요망");
        else if (this.value == "opt_form") $("#txt_msg").val("거푸집에 대한 긴급처리 요망");
        else if (this.value == "opt_conc") $("#txt_msg").val("콘크리트 타설에 대한 긴급처리 요망");
        else $("#txt_msg").val("작업자 수 확인 완료");
    });

    // buttons in message box
    $("#btn_send").click(function () {
        // date-time
        var date_time = { time: Date() };

        // title
        var title = { title: $("#div_title").text() };

        // sender
        var sender = { sender: sessionStorage.login_name };

        // receivers
        var receivers = [];
        $("#lst_rcv option").each(function () {
            receivers.push({ name: $(this).text() });
        });

        // referers
        var referers = [];
        if ($("#sel_ref").val() == "opt_yes_ref") {
            $("#lst_ref option").each(function () {
                referers.push({ show_hide: true, name: $(this).text() });
            });
        }
        else {
            referers.push({ show_hide: false, name: "" });
        }

        // message
        var message = { message: $("#txt_msg").val() };

        // checklist
        var checklists = [];
        if ($("#sel_body_type").val() == "opt_checklist") {
            $(".cls_checklist").each(function () {
                checklists.push({ show_hide: true, item: this.value, checked: $(this).is(":checked") });
            });
        }
        else {
            checklists.push({ show_hide: false, item: "", checked: false });
        }

        // attach
        var attaches = [];
        if ($("#sel_attach").val() == "opt_yes_attach") {
            if ($("#img_atch_pic").css("display") != "none")
                attaches.push({ show_hide: true, pic_dwg: "pic", src: $("#img_atch_pic").attr("src") });
            if ($("#img_atch_dwg").css("display") != "none")
                attaches.push({ show_hide: true, pic_dwg: "dwg", src: $("#img_atch_dwg").attr("src") });
            if (attaches.length == 0)
                attaches.push({ show_hide: false, pic_dwg: "", src: "" });
        }
        else {
            attaches.push({ show_hide: false, pic_dwg: "", src: "" });
        }

        // reply
        //var reply = $("#sel_reply option:selected").val();
        var reply = { reply: $("#sel_reply").val() };

        // target
        var target = { target: $("#sel_target").val() };

        // generate message as JSON and sesseionStorage
        if (sessionStorage.message == undefined) var total_messsage_json = [];
        else var total_messsage_json = JSON.parse(sessionStorage.message);
        var cur_messsage_json = {
            time_stamp: date_time,
            title: title,
            sender: sender,
            receivers: receivers,
            referers: referers,
            message: message,
            checklist: checklists,
            attach: attaches,
            reply: reply,
            target: target
        };
        total_messsage_json.push(cur_messsage_json);
        sessionStorage.message = JSON.stringify(total_messsage_json);

        $("#modal_bg_space").hide();
    });

    $("#btn_cancel").click(function () {
        $("#modal_bg_space").hide();
    });
    $("#btn_exe_now").click(function () {
        $("#modal_bg_space").hide();
    });
    $("#btn_exe_later").click(function () {
        $("#modal_bg_space").hide();
    });
    $("#btn_confirm").click(function () {
        $("#modal_bg_space").hide();
    });

    // When the user clicks on <span> (x), close the modal
    $("#spn_close").click(function () {
        $("#modal_bg_space").hide();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $("#modal_bg_space").hide();
        }
    });
});

function initialize_new_message() {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 1. set message contents
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // title
    $("#div_title").text($("#spn_work").text());

    // sender
    var login_name = $("#spn_login").text();
    $("#inp_snd").val(login_name);

    // receiver
    $("#lst_rcv").children().remove();
    if (login_name == "원청_101동_기사") {
        var rcv_json = { options : [
            { value:"opt_rcv_1" , text:"철근_작업반장" },
            { value:"opt_rcv_2" , text:"철근_작업자 3" },
            { value:"opt_rcv_3" , text:"철근_작업자 4" } ]};
        add_options("#lst_rcv", rcv_json, true);
    }
    else {
        var rcv_json = { options : [
            { value:"opt_rcv_1" , text:"원청_101동_기사" } ]};
        add_options("#lst_rcv", rcv_json, true);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 2. set message options according to the task
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    switch ($("#sel_task").val()) {
        case "commence":
            set_msg_options("opt_yes_ref", "opt_message", "opt_yes_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
        case "progress":
            set_msg_options("opt_no_ref", "opt_message", "opt_no_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
        case "result":
            set_msg_options("opt_no_ref", "opt_checklist", "opt_yes_attach", "opt_write", "opt_yes_reply", "opt_rebar"); break;
        case "complete":
            set_msg_options("opt_no_ref", "opt_message", "opt_no_attach", "opt_write", "opt_no_reply", "opt_rebar"); break;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 3. set message according to message options
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    message_show_hide();
}

function initialize_existing_message(p_message_json) {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 1. set message contents
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //// date-time
    //var date_time = { time: Date() };

    // title
    $("#div_title").text(p_message_json.title.title);

    // sender
    $("#inp_snd").val(p_message_json.sender.sender);

    // receivers
    $("#lst_rcv").children().remove();
    var rcv_json = { options: [] };
    for (i = 0; i < p_message_json.receivers.length; i++) {
        rcv_json.options.push({ value: "opt_rcv_" + (i+1), text: p_message_json.receivers[i].name });
    }
    add_options("#lst_rcv", rcv_json, true);

    // referers
    var show_hide_ref = "opt_no_ref";
    $("#lst_ref").children().remove();
    if (p_message_json.referers[0].show_hide == true) {
        var ref_json = { options: [] };
        for (i = 0; i < p_message_json.referers.length; i++) {
            ref_json.options.push({ value: "opt_ref_" + (i + 1), text: p_message_json.referers[i].name });
        }
        add_options("#lst_ref", ref_json, true);
        show_hide_ref = "opt_yes_ref";
    }

    // message
    var show_hide_msg = "opt_message";
    $("#txt_msg").val(p_message_json.message.message);

    // checklist
    if (p_message_json.checklist[0].show_hide == true) {
        for (i = 0; i < p_message_json.checklist.length; i++) {
            $("#ckl_" + (i + 1)).val(p_message_json.checklist[i].item)
                                .prop("checked", p_message_json.checklist[i].checked);
        }
        show_hide_msg = "opt_checklist";
    }

    // attach
    var show_hide_attach = "opt_no_attach";
    $("#div_attach img").hide(); // css('visibility','hidden') => take space, hide() => take no space
    if (p_message_json.attach[0].show_hide == true) {
        for (i = 0; i < p_message_json.attach.length; i++) {
            if (p_message_json.attach[i].pic_dwg == "pic") {
                $("#img_atch_pic").attr("src", p_message_json.attach[i].src);
                $("#img_atch_pic").show();
            }
            else {
                $("#img_atch_dwg").attr("src", p_message_json.attach[i].src);
                $("#img_atch_dwg").show();
            }
        }
        show_hide_attach = "opt_yes_attach";
    }

    // reply
    var show_hide_reply = p_message_json.reply.reply;

    // target
    var show_hide_target = p_message_json.target.target;

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 2. set message options
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    set_msg_options(show_hide_ref, show_hide_msg, show_hide_attach, "opt_read", show_hide_reply, show_hide_target);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 3. set message according to message options
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    message_show_hide();
}

function message_show_hide() {
    // referer
    if ($("#sel_ref").val() == "opt_no_ref") $("#lst_ref").hide();
    else $("#lst_ref").show();

    // message / checklist
    if ($("#sel_body_type").val() == "opt_message") $("#div_checklist").hide();
    else $("#div_checklist").show();

    // attach
    if ($("#sel_attach").val() == "opt_no_attach") $("#div_attach").hide();
    else $("#div_attach").show();

    // status
    if ($("#sel_status").val() == "opt_write") {
        $(".modal_header").css("background-color", "rgb(157, 34, 60)");
        $("#div_write").show(); $("#div_read").hide();
    }
    else {
        $(".modal_header").css("background-color", "blue");
        $("#div_write").hide(); $("#div_read").show();
    }

    // reply
    if ($("#sel_reply").val() == "opt_no_reply") { $("#btn_exe_now").hide(); $("#btn_exe_later").hide(); $("#btn_confirm").show(); }
    else { $("#btn_exe_now").show(); $("#btn_exe_later").show(); $("#btn_confirm").hide(); }
}

function set_msg_options(p_ref, p_body_type, p_attach, p_status, p_reply, p_target) {
    // generate JSON
    var task_msg_json = { msg_options: [
        { opt_selector: "#sel_ref", opt_value: p_ref },
        { opt_selector: "#sel_body_type", opt_value: p_body_type },
        { opt_selector: "#sel_attach", opt_value: p_attach },
        { opt_selector: "#sel_status", opt_value: p_status },
        { opt_selector: "#sel_reply", opt_value: p_reply },
        { opt_selector: "#sel_target", opt_value: p_target }]
    };
    //opt_items = JSON.parse(p_options_json).msg_options;
    opt_items = task_msg_json.msg_options;

    // set message options
    opt_items.forEach(function (item, i) {
        $(item.opt_selector).val(item.opt_value);
    });
}
