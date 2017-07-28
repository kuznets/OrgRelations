# OrgRelations task:

The goal of this task it to create a RESTful service that stores organisations with relations (parent to child relation). Organization name is unique. One organisation may have multiple parents and daughters. All relations and organisations are inserted with one request (endpoint 1).

API has a feature to retrieve all relations of one organization (endpoint 2). This endpoint response includes all parents, daughters and sisters of a given organization. Good luck!

The service endpoints: 
1) REST API endpoint that would allow to add many organization with relations in one POST request:


    {
        "org_name": "Paradise Island",
        "daughters": [{
            "org_name": "Banana tree",
            "daughters": [{
                "org_name": "Yellow Banana"
            }, { 
                "org_name": "Brown Banana"
            }, { "org_name": "Black Banana"
            }]
        }, {
            "org_name": "Big banana tree",
            "daughters": [{
                "org_name": "Yellow Banana"
            }, {
                "org_name": "Brown Banana"
            }, {
                "org_name": "Green Banana"
            }, {
                "org_name": "Black Banana",
                "daughters": [{
                    "org_name": "Phoneutria Spider"
                }]
            }]
        }]
    }
    
2) REST API endpoint that returns relations of one organization (queried by name). All organization daughters, sisters and parents are returned as one list. List is ordered by name​ and one page may return 100 rows​ at max with pagination support. For example if you query relations for organization “Black Banana”, you will get:


    [{
        "relationship_type": "parent",
        "org_name": "Banana tree"
    }, {
        "relationship_type": "parent",
        "org_name": "Big banana tree"
    }, {
        "relationship_type": "sister",
        "org_name": "Brown Banana"
    }, {
        "relationship_type": "sister",
        "org_name": "Green Banana"
    }, {
        "relationship_type": "daughter",
        "org_name": "Phoneutria Spider"
    }, {
        "relationship_type": "sister",
        "org_name": "Yellow Banana"
    }]



## How to start application.

You need to have installed version control git

Git installation: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

You need to have installed package manager npm and node.js

Npm installation: https://nodejs.org/en/download/

In your work directory open command line

	$ git clone https://github.com/kuznets/OrgRelations.git
	
Go to directory OrgRelations

	$ cd OrgRelations

Install the dependencies

	$ npm install

Run the node application

	$ node server

Start browser and open url

http://localhost:3000/