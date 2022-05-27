const gdriveId = {
  A: '1FHveMkeEWnfjQc4KqgeaitRJPEkSbEuY',
  B: '13DeCq8dqW-EJs_jc1idjDXcm9mUdLWRy',
  C: '1VTcaS88OjX3-gnmsUFJhHcYVXaOMeKk3',
  D: '1UaesYaaujinR132kPiHIik8OEkXs4lbJ',
  E: '1_PaPLmf9HQromvTmTXR_EcAuKJ2RyGG0',
  F: '1LTbG-TN6FTbGesTypL95QUmJtwKotlvB',
  G: '11vnVk701vmi0EkIw9BTEnH7Xuic-081Q',
  H: '1oA7e0T6W5jie9s0WAZxF7pKrsY38bzp5',
  I: '1LZGeln2U6aOLhWjeaTjdgDV4NWjVIfHt',
  J: '1z7gI7RLI08uIxSy6w_6uFxmHN_4qqDY2',
  K: '1n8N9VJsHHXOV9aoxnwoVvrWdq_MczUNm',
  L: '1o8wpUWumNRd17gscakuWE2n4bYI93Nbe',
  M: '1QcfqnBAsuptsmOb4KWE4dlVtFiX9xlT6',
  N: '1yWMqe8eaQL-gGjZOur6klCYKwN13mwy5',
  O: '1aqlmt1nmROUX9PgJQ4VstTwbzZHOzL_C',
  P: '1RICfSUNM4kwDWfWpn05HDPYb-terd6RG',
  Q: '1fMHcWVhP415EIbhKy8oIRKr41xxX7XT9',
  R: '19xYxh-jxQAZEF7lblqMaclcosNLJcn2a',
  S: '1F83E_SRuD9XRmfH6eGJvMjbbmtvvdtqH',
  T: '1a1qhqKVCETSqNpVd_PNAQE-d5kxp_A1r',
  U: '1Ge3zFKHpuCYQq6zjQLlw9_vtfwqtP3Kt',
  V: '1djkA-ZyHLd6-3tTvmQiMYthe-yn65XN9',
  W: '1SMHO7F8qw7rXiDX2Xf4mncbYEe8rU7IN',
  X: '1CTnIjREtXAYKSp33pjxM0qyGciQe_0l2',
  Y: '1RR3OZQztRkAzlzY4UE0m55AnQcSU2CQ-',
  Z: '1sm4xBc7H9k556gjbDbUhUEXRbnI3921i',
  ' ': '1jBuZWhR6J7C1FS7Y3wt_I51mkOP4R8kT',
  others: '1h9DOfF2puZBle-EEXNIgJnTLRjuiqX9A',
};

const getImageFromLetter = (letter) => {
  const imageId = gdriveId[letter.toUpperCase()] ? gdriveId[letter.toUpperCase()] : gdriveId.others;

  return `https://drive.google.com/uc?id=${imageId}`;
};

const getFirstLetterFromPhrase = (phrase) => phrase.charAt(0);

module.exports = {
  getImageFromLetter,
  getFirstLetterFromPhrase,
};
