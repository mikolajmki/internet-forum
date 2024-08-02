export const categoriesWithForums = [
  {
    _id: "65327e7dfaad389a97066d84",
    title: "Mechanika",
    __v: { $numberInt: "0" },
    forums: [
      {
        _id: { $oid: "6532881767fa235c05b96178" },
        name: "Silnik",
        description: "Sample text",
        answers: 52,
        latestThreadId: {
          _id: { $oid: "659811f8658fbb81b729b407" },
          title: "Pomocy, cos w silniku wybuchlo :(",
          author: {
            _id: { $oid: "65411e48617201219c4a5793" },
            username: "bartelomelon",
            profilePicture: "profile_photo_1285.jpeg",
          },
          views: 66,
          posts: [
            { $oid: "65981234658fbb81b729b42a" },
            { $oid: "65981336658fbb81b729b439" },
            { $oid: "65981395658fbb81b729b465" },
            { $oid: "659813b0658fbb81b729b486" },
          ],
        },
        createdAt: { $date: { $numberLong: "1697810455706" } },
        updatedAt: { $date: { $numberLong: "1705867495841" } },
        __v: 0,
        followers: [
          { $oid: "6532ab1df01d672388b34cf9" },
          { $oid: "6531b00064798c0e0fa67881" },
          { $oid: "65411e48617201219c4a5793" },
        ],
      },
      // {
      //   _id: { $oid: "6574a555e14c5932a9663833" },
      //   name: "Skrzynia biegow",
      //   description: "Sample text",
      //   answers: { $numberInt: "6" },
      //   latestThreadId: { $oid: "6578359a84e6a16dd4bc54e2" },
      //   followers: [
      //     { $oid: "6531b00064798c0e0fa67881" },
      //     { $oid: "65411e48617201219c4a5793" },
      //   ],
      //   createdAt: { $date: { $numberLong: "1702143317858" } },
      //   updatedAt: { $date: { $numberLong: "1703094641207" } },
      //   __v: { $numberInt: "0" },
      // },
      // {
      //   _id: { $oid: "658329449fd5ba69cb226d5f" },
      //   name: "Wnetrze",
      //   description: "Sample text",
      //   answers: { $numberInt: "3" },
      //   latestThreadId: { $oid: "6599a0c451d61cf0e8754246" },
      //   followers: [],
      //   createdAt: { $date: { $numberLong: "1703094596372" } },
      //   updatedAt: { $date: { $numberLong: "1704568533917" } },
      //   __v: { $numberInt: "0" },
      // },
    ],
  },
];
