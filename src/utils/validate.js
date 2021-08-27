import Vue from 'vue'
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  email,
  numeric,
  required,
  min_value as minValue,
} from 'vee-validate/dist/rules'

import { VALIDATE_MESSAGE } from '@/utils/constants'
import moment from 'moment'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: VALIDATE_MESSAGE.REQUIRED,
})
extend('email', {
  ...email,
  message: VALIDATE_MESSAGE.EMAIL_INVALID,
})
extend('numeric', {
  ...numeric,
  message: VALIDATE_MESSAGE.NUMERIC,
})
extend('positive_number', {
  ...minValue,
  message: 'Không được phép nhập giá trị âm',
})

extend('minmax', {
  validate(value, { min, max }) {
    if (value) {
      return value.toString().length >= min && value.toString().length <= max
    }
    return true
  },
  params: ['min', 'max'],
  message: 'Giá trị không được vượt quá {max} ký tự',
})

extend('maxlength', {
  validate(value, { maxlength }) {
    if (value) {
      return value.toString().length <= maxlength
    }
    return true
  },
  params: ['maxlength'],
  message: `${VALIDATE_MESSAGE.MAX_LENGTH} {maxlength} ký tự`,
})
extend('minlength', {
  validate(value, { minlength }) {
    if (value) {
      return value.toString().length >= minlength
    }
    return true
  },
  params: ['minlength'],
  message: `${VALIDATE_MESSAGE.MIN_LENGTH} {minlength} ký tự`,
})

extend('startDateTime', {
  validate(value, { ...endDate }) {
    if (value) {
      const t1 = moment(value, 'DD-MM-YYYY HH:mm')
      const t2 = moment(endDate?.startDateTime, 'DD-MM-YYYY HH:mm')
      return t1.isBefore(t2, 'minutes')
    }
    return true
  },
  params: ['startDateTime'],
  message: 'Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc',
})

extend('endDateTime', {
  validate(value, { ...startDate }) {
    if (value) {
      const t1 = moment(value, 'DD-MM-YYYY HH:mm')
      const t2 = moment(startDate?.endDateTime, 'DD-MM-YYYY HH:mm')
      return t1.isAfter(t2, 'minutes')
    }
    return true
  },
  params: ['endDateTime'],
  message: 'Thời gian kết thúc phải lớn hơn thời gian bắt đầu',
})

extend('checkpass', {
  validate(value, { ...newPassWord }) {
    if (value) {
      return value === newPassWord.checkpass
    }
    return true
  },
  params: ['checkpass'],
  message: 'Nhập lại mật khẩu không khớp',
})
