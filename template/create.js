const fs = require('fs')
const name = process.argv.slice(2)[0]
const title = process.argv.slice(3)[0]
if (!name || !title) {
  console.error('------ error ------');
  console.error('例: node create.js test 测试');
  console.error('------ end ------');
}
else {
  const Name = name.substring(0, 1).toUpperCase() + name.substring(1);
  let basepath = 'pages/' //插入文件位置
  let reads = [`template/pages/index.js`, `template/pages/[pid].js`];//要读取的文件
  async function creatCpt() {
    try {
      await exists(); // 检测文件夹
      await readFile(); // 读取模板内容
      await writeFile(await readFile()); //写入组件
    }
    catch (err) {
      console.error(err);
    }
  }
  // 检测文件夹
  let exists = function () {
    return new Promise((res) => {
      (async function () {
        fs.existsSync(basepath + name) ? basepath = `${basepath}${name}/` : await mkdir(name);
        res(basepath);
      })()
    })
  }
  // 创建文件夹
  let mkdir = function (name) {
    return new Promise((res, rej) => {
      fs.mkdir(basepath + name, (err) => {
        if (err) rej(err);
        basepath = `${basepath}${name}/`
        res(basepath);
      });
    })
  }
  // 读取文件内容
  let readFile = function () {
    let file = []
    return new Promise((res) => {
      for (let a of reads) {
        let text = fs.readFileSync(a).toString();
        text = text.replace(/demo/g, name);
        text = text.replace(/Demo/g, Name)
        text = text.replace('{/* 标题 */}', title)
        const insertIndex = text.indexOf('columns = [')
        if (insertIndex >= 0 && fs.existsSync(`jsons/${name}.json`)) {
          const insertText = insertJsons()
          text = text.substring(0, insertIndex + 11) + insertText + text.substring(insertIndex + 11)
        }
        const insertIndex2 = text.indexOf('{/* 输入 */}')
        if (insertIndex2 >= 0 && fs.existsSync(`jsons/${name}.json`)) {
          const insertText = insertJsons2()
          text = text.substring(0, insertIndex2) + insertText + text.substring(insertIndex2)
        }
        file.push(text)
      }
      res(file);
    })
  }
  let writeFile = function (file) {
    return new Promise((res, rej) => {
      (async function () {
        for (let i in file) {
          if (fs.existsSync(`${basepath}${i == 0 ? 'index' : '[pid]'}.js`)) return
          await fs.writeFile(`${basepath}${i == 0 ? 'index' : '[pid]'}.js`,
            file[i], (err) => {
              if (err) rej(err)
            })
        }
        res('succ');
      })()
    })
  }
  let insertJsons = function () {
    let jsons = JSON.parse(fs.readFileSync(`jsons/${name}.json`).toString())
    const list = Object.keys(jsons)
    let result = ``
    list.map((item) => {
      console.log(jsons[item]);
      result = result + `
    { title: '${jsons[item].value}', key: '${item}', dataIndex: '${item}' },`
    })
    return result
  }
  let insertJsons2 = function () {
    let jsons = JSON.parse(fs.readFileSync(`jsons/${name}.json`).toString());
    const list = Object.keys(jsons)
    let result = ``
    list.map((item) => {
      if (jsons[item].type == 'String' || jsons[item].type == 'Number') {
        result = result + `
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>${jsons[item].value}</Col>
        <Col xs={24} sm={14}>
          <Input ${jsons[item].type == 'Number' ? `
            type={'number'}` : ''}
            onChange={(e) => changeText(e.target.value, '${item}')}
            value={details.${item}}></Input>
        </Col>
      </Row>`
      }
    })
    return result
  }
  creatCpt()
}