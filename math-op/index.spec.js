describe("Calcular Operacion Matematica", function () {
	it("4-7+8+9/2*3 debe regresar 18.5", function () {
		expect(calculateText("4-7+8+9/2*3")).toEqual(18.5);
	});
	it("12+25-8 debe regresar 29", function () {
		expect(calculateText("12+25-8")).toEqual(29);
	});
});
