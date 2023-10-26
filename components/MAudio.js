import { Button, Dropdown, Menu, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import { Howl, Howler } from "./../utils/howler.min";
export default function MAudio({ children }) {
  let sound = null
  const [soundList, setSoundList] = useState([])
  const [index, setIndex] = useState(0)
  const [state, setState] = useState('stop')
  const [percent, setPercent] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getList()
      window.addEventListener("storage", function (e) {
        getList()
      });
    }
  }, [])
  const getList = () => {
    const list = localStorage.getItem('soundList')
    if (list) {
      setSoundList(JSON.parse(list))
    }
  }
  // 播放音乐
  const play = (index) => {
    if (!soundList) return
    var data = soundList[index];
    console.log(data);
    if (data.howl) {
      console.log('howl');
      sound = data.howl;
    } else {
      console.log('new howl');
      sound = data.howl = new Howl({
        src: [data.file],
        html5: true,
        onplay: function () {
          console.log('onplay');
          setState('playing')
          if (typeof window !== 'undefined') window.requestAnimationFrame((timestamp) => step(timestamp));
        },
        onload: function () {
          console.log('onliad');
        },
        onend: function () {
          console.log('onend');
          setState('end')
        },
        onpause: function () {
          console.log('onpause');
          setState('pause')
        },
        onstop: function () {
          console.log('onstop');
          setState('stop')
        },
        onseek: function () {
          console.log('onseek');
          if (typeof window !== 'undefined') window.requestAnimationFrame((timestamp) => step(timestamp));
        }
      });
    }
    sound.play()
  }
  // 暂停音乐
  const pause = () => {
    var sound = soundList[index].howl;
    console.log(soundList[index]);
    sound.pause();
  }
  // 跳转音乐
  const skipTo = (old, index) => {
    if (soundList[old].howl && old != index) {
      soundList[old].howl.stop();
    }
    setIndex(index)
    play(index)
  }
  const step = (timestamp) => {
    console.log(1234, timestamp);
    // Get the Howl we want to manipulate.
    var sound = soundList[index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    console.log(seek);
    // timer.innerHTML = self.formatTime(Math.round(seek));
    // progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

  }
  return (
    <div style={{
      position: 'fixed',
      left: '50%',
      transform: 'translateX(-50%)',
      top: 0,
      background: '#333',
      padding: '10px 30px',
      borderRadius: 5
    }}>
      <Progress percent={30} showInfo={false}></Progress>
      <div>
        <Button disabled={index === 0} onClick={() => skipTo(index, index - 1)}>上一首</Button>
        {(state !== 'playing') ?
          <Button onClick={() => skipTo(index, index)}>播放</Button> :
          <Button onClick={() => pause()}>暂停</Button>
        }
        <Button disabled={index === soundList.length - 1}
          onClick={() => { skipTo(index, index + 1) }}
        >下一首</Button>
      </div>
    </div>
  );
}