$(function() {
    //1 按下回车的操作：获取数据并保存到localStorage
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您的操作");
            } else {
                var local = getData();
                local.push({ "todolist": $(this).val(), "done": false });
                saveData(local);
                load();
                $(this).val("");
            }
        }
    });
    //获取数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //2 把数据渲染到页面中
    function load() {
        var data = getData();
        $("ol,ul").empty();
        //5 计数
        var todocount = 0;
        var donecount = 0;
        $.each(data, function(i, n) {
            if (n.done === true) {
                $("ul").prepend("<li><input type='checkbox' checked /><p>" + n.todolist + "</p><a href='javascript:;' id=" + i + "></a></li>");
                donecount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' /><p>" + n.todolist + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todocount++;
            }
        });
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);

    }
    //3 删除按钮
    $("ol,ul").on("click", "a", function() {
        var data = getData();
        var index = $(this).attr("id");
        data.splice(index, 1);
        saveData(data);
        load();
    });
    //4 打钩切换未完成已完成
    $("ol,ul").on("click", "input", function() {
        var index = $(this).siblings("a").attr("id");
        var data = getData();
        data[index].done = $(this).prop("checked");
        // console.log(data);
        saveData(data);
        load();
    });

})