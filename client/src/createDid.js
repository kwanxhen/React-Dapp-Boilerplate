
import EthrDID from 'ethr-did';

// const createDID = (publicAddress, privateKey, provider) => {
//   const ethrDid = new EthrDID({
//     address: publicAddress,
//     privateKey: privateKey,
//     provider
//   });
//   return (
//    ethrDid
//   )
// }

function createDID (publicAddress, provider) {
  const ethrDid = new EthrDID({
        address: publicAddress,
        provider: provider
  });
  


  return (
    ethrDid
  )
}

export {createDID};




