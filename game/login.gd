extends Control


# Declare member variables here. Examples:
# var a = 2
# var b = "text"

onready var password_edit = $CenterContainer/VBoxContainer/HBoxContainer2/password
onready var correo_edit = $CenterContainer/VBoxContainer/HBoxContainer/correo
onready var error_label = $CenterContainer/VBoxContainer/Control/error_label
export var URL = "http://localhost:8000/api/users"
# Called when the node enters the scene tree for the first time.
func _ready():
	
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass


func _on_TextureButton_pressed():
	# = !error_label.visible
	#print("test")
	$HTTPRequest.request(URL)
	pass # Replace with function body.


func _on_HTTPRequest_request_completed(_result, response_code, _headers, body):
	
	var output = body.get_string_from_utf8()
	var json = JSON.parse(output)
	var data = json.result
	
	if (response_code == 200):
		for usuario in data:
			var correo_valido = false
			var password_valido = false
			ControlGlobal.usuario = usuario.name
			ControlGlobal.nickname = usuario.nickname
			if usuario.email == correo_edit.text:
				correo_valido = true
				pass
			if usuario.password == password_edit.text:
				password_valido = true
				pass
				
			if (correo_valido == true )and(password_valido == true):

				var error_code = get_tree().change_scene("res://escenas/menus/inicio.tscn")
				if error_code !=0:
					print("ERROR : ", error_code)
				return
				pass 
			pass
		error_label.visible = true
		
	else:
		error_label.visible = true
		error_label.text = response_code
	
	pass # Replace with function body.
