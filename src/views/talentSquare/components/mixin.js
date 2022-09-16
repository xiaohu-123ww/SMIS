
function gettalents(data, info, rcms) {
  if (data !== undefined) {
    var array = [];
    rcms.forEach(item => {
      info.forEach(items => {
        if (item.position.fullname === items.rcm.position.fullname) {
          var talent = {
            rcmname: '',
            talentinfolist: [],
            cv: {}

          };
          var tranlentinfo = {
            headportrait: '', // 头像
            applicant: '', // 应聘者名字
            education: '', // 教育水平
            professionallist: [] // 学习专业
          };
          var infos = items.rec;
          // rec 推荐候选人  inv 正在邀请中
          for (var i = 0; i < infos.length; i++) {
            // 头像
            tranlentinfo.headportrait = 'https://znzz.tech/' + infos[0].cv.image;
            talent.cv = infos[0].cv;
            talent.cv.rcmid = item.id;
            // 应聘者名称
            tranlentinfo.applicant = infos[0].cv.user_id.last_name + infos[0].cv.user_id.first_name;
            // 学习专业
            // var a= infos[0].cv.professional_skill
            var pattern = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？ ]');
            if (infos[0].cv.professional_skill !== '无') {
              if (pattern.test(infos[0].cv.professional_skill)) {
                if (infos[0].cv.professional_skill.indexOf('、') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split('、');
                }
                if (infos[0].cv.professional_skill.indexOf('，') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split('，');
                }
                if (infos[0].cv.professional_skill.indexOf('.') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split('.');
                }
                if (infos[0].cv.professional_skill.indexOf(' ') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split(' ');
                }
                if (infos[0].cv.professional_skill.indexOf(',') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split(',');
                }
                if (infos[0].cv.professional_skill.indexOf('；') > 0) {
                  tranlentinfo.professionallist = infos[0].cv.professional_skill.split('；');
                }
              } else {
                tranlentinfo.professionallist = Array(infos[0].cv.professional_skill);
              }

              tranlentinfo.professionallist.forEach((rs, index) => {
                if (rs === '' || rs === null || rs === undefined) {
                  tranlentinfo.professionallist.splice(index, 1);
                }
              });
            }

            // 学历
            data.forEach(itemes => {
              if (infos[0].cv.education_level === itemes.idx) {
                tranlentinfo.education = itemes.label;
              }
            });
          }
          talent.rcmname = item.position.fullname;
          talent.talentinfolist.push(tranlentinfo);
          array.push(talent);
        }
      });
    });
    // console.log(array)
    return array;
  }
}

function getseaechlist(list) {
  if (list.length != 0) {
    // console.log(list)
    var educationlist = list.education_levels;
    var postlist = list.post_list;
    postlist.forEach(item => {
      educationlist.forEach(items => {
        if (item.education_level === items.idx) {
          item.education_level = items.label;
        }
      });
    });
  }

  //  (postlist)
  // console.log(postlist)
  return postlist;
}

function gettag(data) {
  // console.log(data)
  if (data !== undefined) {
    var pattern = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？ ]');
    if (data !== '无') {
      if (pattern.test(data)) {
        if (data.indexOf('、') > 0) {
          data = data.split('、');
        }
        if (data.indexOf('，') > 0) {
          data = data.split('，');
        }
        if (data.indexOf('.') > 0) {
          data = data.split('.');
        }
        if (data.indexOf(' ') > 0) {
          data = data.split(' ');
        }
        if (data.indexOf(',') > 0) {
          data = data.split(',');
        }
        if (data.indexOf('；') > 0) {
          data = data.split('；');
        }
      } else {
        data = Array(data);
      }

      data.forEach((rs, index) => {
        if (rs === '' || rs === null || rs === undefined) {
          data.splice(index, 1);
        }
      });
    }
    return data;
  }
}

export { getseaechlist, gettalents, gettag };
