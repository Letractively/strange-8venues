{
	"title": "Your Own Personal Tutorial",
	"intro": "<p>Welcome, <b>{name}</b>, to the Strange Avenues tutorial.</p><h3>Objective</h3><p>Find the missing fish.</p>",
	"setup": {
		"startDate" : "Dec 29, 1934 00:00:00",
		"startStatus" : "Well, {name}, here you are. Move around to trigger an event at 12:15 AM",
		"startInventory": {
			"wallet": {
				"money": 200
			},
			"phone": {
				"num": 2119,
				"contacts": [ "MrTodd", "MsPlitt"]
			}
		}
	},
	"characters": {
		"MrTodd": {
			"name": {
				"full": "Drake Todd",
				"formal": "Mr Todd",
				"casual": "Drake"
			},
			"phone": 3434,
			"dialog": {
				"greeting": ["Hello, {name}!", "What's up?", "This is Mr Todd, are you the plumber?"]
			}
		},
		"MsPlitt": {
			"name": {
				"full": "Lydia Plitt",
				"formal": "Ms Plitt",
				"casual": "Lydia"
			},
			"phone": 3434,
			"dialog": {
				"greeting": ["Oh hello, {name}!", "I have answered the phone, yes? I'm done.", "Ready to talk. Go!"]
			}
		}
	},
	"events":{
		"time":{
			"Dec 29, 1934 00:15:00" : {
				"dialog": {
					"title": "You did it!",
					"content": "Congrats on moving around, {name}! Keep looking for the fish."
				},
				"status": "You smell fish nearby."
			},
			"Dec 29, 1934 00:16:00" : {
				"dialog": {
					"title": "33 Past Midnight",
					"content": "Here's another event."
				}
			},
			"Dec 29, 1934 00:20:00" : {
				"status": "Silent update without dialog."
			}
		},
		"action":{}
	}
}