var request = require("request");
var base_url = "http://localhost:3000/"
describe("GET /", function() {
    it("returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
            expect(response).toBeDefined();
            if(response) {
                expect(response.statusCode).toBe(200);
            }
            done();
        });
    });
});

describe("User API", function() {
    var user = {
        'name': 'Jon Doe',
        email:'testspec@example.com',
        password: 'Test12345@54321',
        password_confirm: 'Test12345@54321',
        user_type: 'manager',
        'address.street1': '123 Street',
        'address.city': 'City Place',
        'address.state': 'NY',
        'address.postcode': '10466',
        phone: '555-555-5555',
        verify: 'verified'
    };

    describe("Create User", function() {
        it("returns status code 200", function(done) {
            request.post({url:base_url + 'api/user/create', formData: user}, function(error, response, body) {
                expect(response).toBeDefined();
                if(response) {
                    user = JSON.parse(response.body);
                    expect(response.statusCode).toBe(200);
                }
                done();
            });
        });
    });
    describe("Remove User", function() {
        it("returns status code 200", function(done) {
            console.log(user._id);
            request.post({url:base_url + 'api/user/remove', formData: {id: user._id}}, function(error, response, body) {
                expect(response).toBeDefined();
                if(response) {
                    expect(response.statusCode).toBe(200);
                }
                done();
            });
        });
    });
});
