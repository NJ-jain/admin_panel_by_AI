
const dbSchema = new mongoose.Schema({
    
})

module.exports = mongoose.models.db || mongoose.model('db' , dbSchema);