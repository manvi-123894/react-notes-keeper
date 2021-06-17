
export const useLocalStorage = () => {
    const list = JSON.parse(localStorage.getItem('notes-array'));
    if(list){
        return list;
    }
    return [];
}