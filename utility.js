var Education = require('./models/education'),
    Experience = require('./models/experience'),
    Volunteer = require('./models/volunteer');

module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated())
            return next();
        res.redirect('/');
    },
    addEducation: function(data){
        var newEdu = new Education(data.edu);
        newEdu.prof_id = data.usr._id;
        newEdu.save(function(err){
            if(err){return 404}
            else{console.log('User Education added'); return 200}
        });
    },
    addAllUserEducation: function(eduData, user){
        for(var i = 0; i < eduData.length; i++){
            var edu = new Education(eduData[i]);
            edu.prof_id = user._id;
            edu.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Education added!');}
            });
        }
    },
    removeEducation: function(id){
        Education.findOneAndRemove({_id: id}, function(err){
            if(err) return 404;
            console.log('Education removed!');
            return 200;
        });
    },
    addExperience: function(data){
        var newExp = new Experience(data.exp);
        newExp.prof_id = data.usr._id;
        newExp.save(function(err){
            if(err){return 404}
            else{console.log('User Education added'); return 200}
        });
    },
    addAllUserExperience: function(expData, user){
        for(var i = 0; i < expData.length; i++){
            var exp = new Experience(expData[i]);
            exp.prof_id = user._id;
            exp.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Experience added!')}
            });
        }
    },
    removeExperience: function(id){
        Experience.findOneAndRemove({_id: id}, function(err){
            if(err) return 404;
            console.log('Experience removed!');
            return 200;
        })
    },
    addVolunteer: function(data){
        var newVol = new Volunteer(data.vol);
        newVol.prof_id = data.usr._id;
        newVol.save(function(err){
            if(err){return 404}
            else{console.log('User Volunteer added'); return 200}
        });
    },
    addAllUserVolunteerExperience: function(volData, user){
        for(var i = 0; i < volData.length; i++){
            var vol = new Volunteer(volData[i]);
            vol.prof_id = user._id;
            vol.save(function(err){
                if(err){console.log(err)}
                else{console.log('User Volunteer Experience added!')}
            });
        }
    },
    removeVolunteer: function(id){
        Volunteer.findOneAndRemove({_id: id}, function(err){
            if(err) return 404;
            console.log('Volunteer Experience Removed!');
            return 200;
        })
    }
};
