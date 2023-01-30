import { useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

function App() {
  const [movieContent, setMovieContent] = useState({
    // useState를 이용해 입력한 내용을 state에 저장하는 과정
    title:'',
    content: ''
  })

  const [viewContent, setViewContent] = useState([]);//입력 누르면 내용 업데이트 state


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
              onClick={()=>{
                setViewContent(viewContent.concat({...movieContent}));
              }}
              //입력 버튼 클릭스 위 setState배열에 추가하는 기능
              //버튼을 눌렀을 때 viewContent라는 배열 안에 movieContent라는 객체를 복사해서 
              //concat 해준다음 그 내용으로 변경 해주는 내용이다.
              //push 함수는 원본 배열을 변화시키기 때문에 아래와 같이 concat을 사용해준다.
        >입력</button>
    </div>
  );
}

export default App;
