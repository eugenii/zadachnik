let cross_summ = [9, 15];
let numbers_id = ["#text_1", "#text_2", "#text_3", "#text_4", "#text_5", "#text_6", "#text_7", "#text_8", "#text_9"];
let numbers_style = ["font-size:7.24436px;line-height:1.25;font-family:sans-serif;stroke-width:0.27166;cursor:pointer;opacity:1",
						"font-size:12px;line-height:1.5;font-family:sans-serif;stroke-width:0.4;cursor:pointer;opacity:1",
						"font-size:0.5px;line-height:1.1;font-family:sans-serif;stroke-width:0.1;opacity:0" ];
let cells_id = ["#cell_1", "#cell_2", "#cell_3", "#cell_4", "#cell_5", "#cell_6", "#cell_7", "#cell_8", "#cell_9"];
let cells_texts_ids = ["#cell_text_1", "#cell_text_2", "#cell_text_3", "#cell_text_4", "#cell_text_5", "#cell_text_6", "#cell_text_7", "#cell_text_8", "#cell_text_9"];
// [0] - ненаведенные [1] - наведенные
let cells_style = ["opacity:1;fill:#fffdff;fill-opacity:1;stroke:#0000fa;stroke-width:0.264583;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1",
"opacity:1;fill:#fffdff;fill-opacity:1;stroke:#f14129;stroke-width:0.765;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1"];
let current_number = 0;
//  точно ------------------------------
let places_0 = [1, 2, 3, 4, 5];
let numbers_0 = [1, 2, 3, 4, 5];
let current_place = 0;
let cell_index = 0;
let levels = [5, 9, 6];  // количество чисел в уровне


// new functions ----------------------

 function click_number(el){
	 current_number = parseInt($(el).attr("num")); // установить текущее число
	 console.log(`current number - > ${current_number}`);
	 change_number_style(current_number);
	 $("#text_inform2").text("Выберите место");


 }
function change_number_style(current_number){
    level = parseInt($("#cur_level").text());
    console.log(`New level-> ${level}`);
	if (level == 0){
		lev = 4;
	}
	else { lev = 9}
	for (let i = 0; i <= levels[level] - 1; i++){
		// сбрасываем выбор всех цифр (становятся обычными)
		if (current_number == 0){
			console.log("change all to style 0");
			$(numbers_id[i]).attr("style", numbers_style[0]);
			continue
		}
		// если делаем выбранной цифру (становится мелкой)
		if (current_number < 0){
			console.log("change 1 element to style empty");
			$(numbers_id[current_number * (-1) - 1]).attr("style", numbers_style[2]);
			continue
		}
		// если цифра уже выбрана, пропускаем..
		if ($(numbers_id[i]).attr("style") == numbers_style[2]){
			continue
		} 
		//  делаем текущей выбранную цифру (становится крупной)
		if (current_number == i + 1) {$(numbers_id[i]).attr("style", numbers_style[1]);console.log($(numbers_id[i]).attr("style"));}
		else {$(numbers_id[i]).attr("style", numbers_style[0]);}
	}
}
function cell_hover_in(el){
	cell_index = parseInt($(el).attr("num"));
	console.log(cell_index);
	$(cells_id[cell_index - 1]).attr("style", cells_style[1]);
}
function cell_hover_out(el){
	cell_index = parseInt($(el).attr("num"));
	$(cells_id[cell_index - 1]).attr("style", cells_style[0]);
}
function cell_click(el){
	if (current_number != 0 && current_number > 0){
		if($(cells_texts_ids[cell_index - 1]).text() == "x"){
			$(cells_texts_ids[cell_index - 1]).text(current_number);
		current_number = current_number * (-1);
		change_number_style(current_number);
		check_sum();
		$("#text_inform2").text("Выберите число")
		}
		else {
			console.log("clear cell!");
			$("#text_inform2").text("клетка занята");
		}
	}
}
function cell_dblclick(el){
	cell_index = parseInt($(el).attr("num"));
	var temp = parseInt($(cells_texts_ids[cell_index - 1]).text());
	console.log(`temp=${temp}`);
	$(cells_texts_ids[cell_index - 1]).text("x");
	$(numbers_id[temp - 1]).attr("style", numbers_style[0]);
	$("#text_inform2").text("Выберите число")

}
function check_sum(){
	console.log("start check summ");
	level = parseInt($("#cur_level").text());
    console.log(`New level-> ${level}`);
	for (var i = 0; i < cells_id.length; i++){
		console.log(parseInt($(cells_texts_ids[i]).text()));
		numbers_0[i] = parseInt($(cells_texts_ids[i]).text());
		console.log(`cur lev-${level}`, numbers_0);
	}
	switch (level){
		case (0):
    if (numbers_0[0] + numbers_0[1] + numbers_0[4] == numbers_0[2] + numbers_0[3] + numbers_0[4]){
        $("#code").text("☼ɤ♌");
        console.log("OK!!!");
		break;
    }
		
		case (1):
			if ((numbers_0[0] + numbers_0[1] + numbers_0[8] == numbers_0[2] + numbers_0[3] + numbers_0[8])
				&& (numbers_0[4] + numbers_0[5] + numbers_0[8] == numbers_0[6] + numbers_0[7] + numbers_0[8])
				&& (numbers_0[0] + numbers_0[1] + numbers_0[8] == numbers_0[6] + numbers_0[7] + numbers_0[8])){
        $("#code").text("✷✉✌✅");
        console.log("OK!!!");
		break;
		}
		case (2):
			if (numbers_0[0] + numbers_0[1] + numbers_0[2] == 9
			&& numbers_0[2] + numbers_0[3] + numbers_0[4] == 9
			&& numbers_0[4] + numbers_0[5] + numbers_0[0] == 9){
        $("#code").text("♘☮☘😀");
        console.log("OK!!!");
		break;
		}
	
}
}
function hide_code(){
	$("#g928").attr("display", "none");

}
function check_code(){
	level = parseInt($("#user_level").text()[0]);
	/*if (level == 0){
		alert("Для продолжения необходимо зарегистрироваться \n или войти");
		return
	}*/
	switch (level){
		case (0):
			if ($("#code2").val() == "☼ɤ♌"){
				$("#next_level").toggle();
				break;
			}
		case (1):
			if ($("#code2").val() == "✷✉✌✅"){
				$("#next_level").toggle();
				break;
			}
		case (2):
			if ($("#code2").val() == "♘☮☘😀"){
				$("#next_level").toggle();
				break;
			}
	}
}
function relo(){location.reload()}
// end new functions ---------------------------

