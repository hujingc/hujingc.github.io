import data from '../datasets/allBones.json'
export const skulls = 'Skulls', arms = 'Arms', legs = 'Legs', wings = 'Wings', fins = 'Fins', tentacles = 'Tentacles', tails = 'Tails', torsos = 'Torsos';

export const skullsData = data.filter(({ Type }) => Type === skulls);
export const armsData = data.filter(({ Type }) => Type === arms);
export const legsData = data.filter(({ Type }) => Type === legs);
export const wingsData = data.filter(({ Type }) => Type === wings);
export const finsData = data.filter(({ Type }) => Type === fins);
export const tentaclesData = data.filter(({ Type }) => Type === tentacles);
export const tailsData = data.filter(({ Type }) => Type === tails);
export const torsoData = data.filter(({ Type }) => Type === torsos);

export const allBonesTypes = [torsos, skulls, arms, legs, wings, fins, tentacles, tails]
export const allBonesData = [torsoData, skullsData, armsData, legsData, wingsData, finsData, tentaclesData, tailsData]

export const menaceYes = "Menace 1+", antiquityYes = "Antiquity 1+", amalgamyYes = "Amalgamy 1+";
export const extraBoneNames = ["Nodule of Warm Amber", "Bone Fragments"]

export const skullsReference = data.filter(({ Type }) => Type === skulls);
skullsData.forEach(info => skullsReference[info.Name] = info);

export const armsReference = data.filter(({ Type }) => Type === arms);
armsData.forEach(info => armsReference[info.Name] = info);

export const legsReference = data.filter(({ Type }) => Type === legs);
legsData.forEach(info => legsReference[info.Name] = info);

export const wingsReference = data.filter(({ Type }) => Type === wings);
wingsData.forEach(info => wingsReference[info.Name] = info);

export const finsReference = data.filter(({ Type }) => Type === fins);
finsData.forEach(info => finsReference[info.Name] = info);

export const tentaclesReference = data.filter(({ Type }) => Type === tentacles);
tentaclesData.forEach(info => tentaclesReference[info.Name] = info);

export const tailsReference = data.filter(({ Type }) => Type === tails);
tailsData.forEach(info => tailsReference[info.Name] = info);

export const torsoReference = data.filter(({ Type }) => Type === torsos);
torsoData.forEach(info => torsoReference[info.Name] = info);
