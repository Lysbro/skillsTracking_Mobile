export const Environment = {

    _APP_URL: 'http://skillstracking.motjo.io/',
    _API_URL: 'http://skillstracking.motjo.io/api/',
    _APP_IMG_URL: 'http://skillstracking.motjo.io/uploads/images/',
    _APP_LOGO_URL: 'http://skillstracking.motjo.io/uploads/logos/',
    _APP_CALENDAR_URL: 'http://skillstracking.motjo.io/uploads/calendars/',

    _STUDENT_URL: {

        dashboardUrl: 'getFormations',
        dashboardUrlSkillUpdate: 'progression/updateStudentValidation',
        reportsByFormation: 'report/getStudentsReportByFormation'

    },

    _TEACHER_URL: {

        formationsUrl: 'teacher/myFormations',
        studentsByFormation: 'getStudentsOfFormation/',
        dashboardUrl1: 'getStudentDatas/',
        dashboardUrl2: '/ofFormation/',
        dashboardUrlSkillUpdate: 'progression/updateTeacherValidation',
        reportsByFormation: 'reportsByFormation/'

    }

}