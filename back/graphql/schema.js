
type Query {
    getPosts( 
     Company: Int!
    ): [Posts]

}


type Mutation {
    login(
     UserId: String!
     UserPW: String!   
    ): String

    getPosts( 
     Company: Int!
    ): [Posts]
}

type Message {
    user: Users
}

type Corps {
    No: Int!
    CorpId: String!
    CorpName: String!
    CompanyRegNo: String
    CreatedDate: String
    ModifiedDate: String
}

type Users {
    No: ID!
    Company: Corps!
    UserId: String!
    UserPW: String!
    UserName: String!
    CreatedDate: String
    ModifiedDate: String
}

type Posts {
    No: ID!
    Title: String!
    Contents: String!
    Files: String
    UserId: String!
    Counter: Int
    Company: Int!
    CreatedDate: Date
    ModifiedDate: String

}


