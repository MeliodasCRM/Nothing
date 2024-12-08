const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			favorites: [],
			people: [],
			planets: [],
			vehicles: [],
			currentEntity: null
		},
		actions: {
			// Función para cargar entidades de Star Wars
			loadStarWarsEntities: async (type) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/${type}`);
					const data = await response.json();
					
					// Actualizar el store con las entidades según el tipo
					const store = getStore();
					setStore({ ...store, [type]: data.results });
					return data.results;
				} catch (error) {
					console.error(`Error loading ${type}:`, error);
				}
			},

			// Cargar detalles de una entidad específica
			loadEntityDetails: async (type, uid) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
					const data = await response.json();
					
					setStore({ currentEntity: data.result.properties });
					return data.result.properties;
				} catch (error) {
					console.error(`Error loading ${type} details:`, error);
				}
			},

			// Obtener imagen de Star Wars Visual Guide
			getStarWarsImage: (type, uid) => {
				const imageMap = {
					people: `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`,
					vehicles: `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`,
					planets: `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`
				};
				return imageMap[type] || 'https://via.placeholder.com/400x600.png?text=Star+Wars';
			},

			// Agregar a favoritos
			addToFavorites: (item) => {
				const store = getStore();
				const favorites = store.favorites;
				
				// Verificar si el elemento ya está en favoritos
				if (!favorites.some(fav => fav.uid === item.uid)) {
					const newFavorites = [...favorites, item];
					setStore({ favorites: newFavorites });
					
					// Guardar en localStorage
					localStorage.setItem('starWarsFavorites', JSON.stringify(newFavorites));
				}
			},

			// Eliminar de favoritos
			removeFromFavorites: (uid) => {
				const store = getStore();
				const favorites = store.favorites.filter(fav => fav.uid !== uid);
				
				setStore({ favorites });
				
				// Actualizar localStorage
				localStorage.setItem('starWarsFavorites', JSON.stringify(favorites));
			},

			// Cargar favoritos desde localStorage al iniciar
			loadFavoritesFromStorage: () => {
				const savedFavorites = localStorage.getItem('starWarsFavorites');
				if (savedFavorites) {
					setStore({ favorites: JSON.parse(savedFavorites) });
				}
			}
		}
	};
};

export default getState;