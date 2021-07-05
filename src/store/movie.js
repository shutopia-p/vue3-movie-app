import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defalutMessage = 'Search for the movie title!'

export default {
  //module!
  namespaced: true,
  //data!
  state: () => ({
    movies: [],
    message: _defalutMessage,
    loading: false,
    theMovie: {}
  }),
  // computed!
  getters: {},
  // methods!
  // 변이(데이터변경)
  mutations: {
    updateState(state, payload) {
      //['movies','message','loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defalutMessage
      state.loading = false
    }
  },
  //비동기로 동작
  actions: {
    async searchMovies({ state, commit }, payload) {
      //동작이 끝나기전에 apply를 여러번 시도하여 부하가 걸리는 것을 방지하는 방법
      if (state.loading) return

      //commit(): 데이터 수정(초기화)
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) //266
        console.log(typeof totalResults) //string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
  
        //추가 요청!
        if(pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch (message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
         const res = await _fetchMovie(payload)
         console.log(res.data)
         commit('updateState', {
           theMovie: res.data
         })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY ='7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if (res.data.Error) {
          reject(res.data.Error) 
        }
        resolve(res)
      })
      .catch(err => {
        reject(err.message)
      })
  })
}