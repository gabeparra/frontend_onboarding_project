import create from 'zustand';

interface SearchBarState {
  showSearchBar: boolean;
  setShowSearchBar: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useSearchBarStore = create<SearchBarState>((set) => ({
  showSearchBar: false,
  setShowSearchBar: (value) => set({ showSearchBar: value }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
