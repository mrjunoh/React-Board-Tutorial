import { useEffect, useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';
import axios from 'axios';

function App() {
  const [movieContent, setMovieContent] = useState({
    // useState를 이용해 입력한 내용을 state에 저장하는 과정
    title:'',
    content: ''
  })

  const [viewContent, setViewContent] = useState([]);//입력 누르면 내용 업데이트 state

  //useeffect hook을 사용하는데 2번째 인자에 []빈 배열을 넣어주면
  // 이 코드를 처음 1회만 실행한다는 의미이다.
  //아까 서버쪽에 작성한 코드로 요청을 보내고 그에 대한 
  //응답을 콘솔로 찍으면 아래 사진처럼 data에 내용을 받아오는 것을 확인할 수 있다.
  useEffect(()=>{
    axios.get('http://localhost:8000/api/get').then((response)=>{
      console.log(response.data);
    })
  },[viewContent])//[viewContent] 이걸 해줌으로써 업데이트된 모습을 바로 확인가능하다.
//   이제 이렇게 받아온 데이터를 아까전에 만들어놓은 빈 배열 state인 viewContent 에 담아줄 것이다.
// response.data 를 viewCount 에 업데이트 해주고 나면 아래와 같이 
//db의 내용이 화면에 잘 출력되는 것을 볼 수 있다!


  //눌렸을 때 서버로 내용을 전송하는 함수를 만들어줌
  const submitReview = ()=>{
    //axios를 이용해 title, content 데이터를 post방식으로 보내고 완료되면 alert 창을 띄워주는 코ㅡㄷ
    // /api/insert는 우리가 localhost:8000/api/insert로 내용을 전송한다는 뜻
    axios.post('http://localhost:8000/api/insert', {
      title: movieContent.title,
      content: movieContent.content
    }).then(()=>{
      alert('등록 완료!');
    })
  };


  //input의 내용이 변할 때 그값을 state에 업데이틑 해주는 기능 넣어야한다.
  const getValue = e =>{// input에 적히는 내용을 캐치하는 함수
    // 이벤트가 발생하면 그 이벤트의 name,value를 가지고 온다.
    const {name, value} = e.target;
    setMovieContent({
      //의미는 movieContent 의 내용을 복사해서 
      //그 안에 name이라는 이름의 키의 값을 value로 바꿔 저장한다는 의미이다.
      //리액트에서는 값을 직접 수정하면 안되기때문에 다음과 같이 복사해서 수정하는 방식을 이용한다.
      ...movieContent,
      [name]: value
    })
    console.log(movieContent);
  }



  return (
    <div className="App">
      <h1>Movie Review</h1>
      <div className='movie-container'>
        {viewContent.map(element=>
          <div>
            <h2>{element.title}</h2>
            <div>
              {parse(element.content)}
            </div>
          </div>
          )}
      </div>
      <div className='form-wrapper'>
        <input className="title-input"
                type='text'
                laceholder='제목'
                onChange={getValue}
                name='title'/>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...movieContent,
              content: data
            })
            console.log(movieContent);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button className="submit-button"
              onClick={submitReview}
              //입력 버튼 클릭스 위 setState배열에 추가하는 기능
              //버튼을 눌렀을 때 viewContent라는 배열 안에 movieContent라는 객체를 복사해서 
              //concat 해준다음 그 내용으로 변경 해주는 내용이다.
              //push 함수는 원본 배열을 변화시키기 때문에 아래와 같이 concat을 사용해준다.
        >입력</button>
    </div>
  );
}

export default App;
