import {create} from 'zustand';

const useStore = create((set) => ({
  auth:{
    username:''
  },
  setUsername:(name)=>set((state)=>({auth:{...state.auth,username:name}}))
}));
export default useStore;
