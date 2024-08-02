export const forums = [
    {
        _id: { $oid: "6532881767fa235c05b96178" },
        name: "Silnik",
        description: "Sample text",
        answers: 52,
        followers: [
          { $oid: "6532ab1df01d672388b34cf9" },
          { $oid: "6531b00064798c0e0fa67881" },
          { $oid: "65411e48617201219c4a5793" },
        ],
    },
    {
        _id: { $oid: "65785ab1bc9c40684b9e2450" },
        name: "Samoloty",
        description: "Forum o samolotach RC",
        answers: 4,
        followers: [],
        createdAt: 1702386353674,
        __v: { $numberInt: "0" },
    },
    {
        _id: { $oid: "658329c89fd5ba69cb227046" },
        name: "Zestawy PC",
        description: "Sample text",
        answers: 0,
        followers: [],
        createdAt: 1703094728159,
        __v: { $numberInt: "0" },
    }
]