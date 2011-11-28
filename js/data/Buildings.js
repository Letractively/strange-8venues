{
	"apartment": [{
			"name": "The Western",
			"templates": ["apartment_template_1"],
			"floors": 5,
			"aptsPerFloor": 10,
			"frequency": 20
		},{
			"name": "The Eastern",
			"templates": ["apartment_template_1"],
			"floors": 10,
			"aptsPerFloor": 3,
			"frequency": 20
	}],
	"shop": [{
			"name": "Hardware Store",
			"templates": ["shop_template_1"],
			"contains" : [{"hammer":5}, {"nail":100}],
			"frequency": 10
		},{
			"name": "Jewelry Store",
			"templates": ["shop_template_1"],
			"contains" : [{"diamondRing": 2}, {"rubyNecklace": 5}],
			"frequency": 10
	}],
	"restaurant": [{
			"name": "Chinese Restaurant",
			"templates": ["restaurant_template_1"],
			"serves": ["friedRice", "plainRice", "mooshuPork"],
			"frequency": 5
		},{
			"name": "Indian Restaurant",
			"templates": ["restaurant_template_1"],
			"serves": ["lambSaag", "chickenTikka", "donarKebab"],
			"frequency": 5
	}]
}