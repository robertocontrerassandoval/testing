const request = require("supertest");
const server = require("../index");

//test de GET
describe("GET /cafes", () => {
    it("devuelve un status code 200", async () => {
        const response = await request(server)
            .get("/cafes")
            .send();
        expect(response.status).toBe(200);
    })

    it("devuelve un array de objetos", async () => {
        const response = await request(server)
            .get("/cafes")
            .send();
        expect(Array.isArray(response.body)).toBe(true);
    })
})


//test de DELETE
describe("DELETE /cafes/:id", () => {
    it("devuelve un status code 404 al eliminar un cafe que no existe", async () => {
        const response = await request(server)
              .delete("/cafes/5") // se simula que no existe el cafe con id 5
              .set("Authorization", "Bearer 1234") // se simule un token inválido
        expect(response.status).toBe(404);
    })
})
    

//test de POST
describe("POST /cafes", () => {
    describe("si agrega un nuevo cafe", () => {
        const nuevoCafe = {
            "id": 5,
            "nombre": "macchiato"
        };

        it("devuelve un status codigo 201", async () => {
            const response = await request(server)
                .post("/cafes")
                .send(nuevoCafe);
            expect(response.status).toBe(201);
        })
    })
})

//test de PUT
describe("PUT /cafes/:id", () => {
    it("devuelve un status code 404 al actualizar un cafe que no existe", async () => {
        const response = await request(server)
             .put("/cafes/5")
             .send();
        expect(response.status).toBe(400);
    });
});