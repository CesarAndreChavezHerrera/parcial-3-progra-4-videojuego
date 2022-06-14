extends Node

export var URL ="http://localhost:8000/api/ranking"
var contador_disparo
var contador_disparo_magico
var contador_muerte
var contador_tiempo
var guardar = false
func _ready():
	
	contador_disparo_magico = $CenterContainer/VBoxContainer/n_balas_magica/magia
	contador_disparo = $CenterContainer/VBoxContainer/n_balas/disparo
	contador_muerte = $CenterContainer/VBoxContainer/n_muerte/muertes
	contador_tiempo = $CenterContainer/VBoxContainer/tiempo/contador_tiempo
	contador_disparo_magico.text = String(ControlGlobal.disparos_magico)
	contador_disparo.text = String(ControlGlobal.disparos)
	contador_muerte.text = String(ControlGlobal.muertes)
	contador_tiempo.text = ControlGlobal.get_tiempo()
	
	
	set_process(false)
	set_physics_process(false)
	set_process_input(false)
	pass # Replace with function body.


func _on_volver_jugar_pressed():
	#$boton.play(0)
	var new_value = {
				"nickname": ControlGlobal.nickname,
				"n_muertes": str(ControlGlobal.muertes),
				"n_disparo_magia": str(ControlGlobal.disparos_magico),
				"n_disparo_arma": str(ControlGlobal.disparos),
				"tiempo": str(ControlGlobal.get_tiempo())
			}
	var query = JSON.print(new_value)
	
	var header = ["Content-Type: application/json"]
	$HTTPRequest.request(URL,header,false,HTTPClient.METHOD_POST,query)
	
	
	pass # Replace with function body.


func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var output = body.get_string_from_utf8()
	var json = JSON.parse(output)
	var data = json.result
	print(data,response_code)

	if (response_code == 200):
		var ERROR_CODE = get_tree().change_scene("res://escenas/menus/inicio.tscn")
		if ERROR_CODE != 0:
			print(ERROR_CODE)
		pass
	
		ControlGlobal.resetear()
		print("se guardo")
	pass # Replace with function body.
