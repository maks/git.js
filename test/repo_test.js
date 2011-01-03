require('../lib/jsgit-server')

exports.Repo = { 
  testCreate: function(test) {
    var repo = new JsGit.Repo()
    test.done()
  },
  
  testEmpty: function(test) {
    var repo = new JsGit.Repo()
    test.equal(repo.getRefs().length, 0)
    test.equal(repo.getRemotes().length, 0)
    test.done()
  },
  
  testAddRef: function(test) {
    var repo = new JsGit.Repo()
    test.deepEqual(repo.getRefs(), [])
    
    repo.addRef("master", "yurrffff")
    test.equals(repo.getRefs().length, 1)
    test.deepEqual(repo.getRef("master"), {name: "master", sha: "yurrffff", remote: null})
    test.done()
  },
  
  testAddRemote: function(test) {
    var repo = new JsGit.Repo()
    test.deepEqual(repo.getRemotes(), [])
    
    repo.addRemote("origin", "http://www.yahoo.com/")
    
    test.equals(repo.getRemotes().length, 1)
    test.deepEqual(repo.getRemote("origin").url, "http://www.yahoo.com/")
    test.done()
  },
  
  testAddObject: function(test) {
    var repo = new JsGit.Repo()
    test.deepEqual(repo.objectCount(), 0)
    
    repo.addObject("asdfasdf", "blob", "Hello World!")
    
    test.equals(repo.objectCount(), 1)
    test.deepEqual(repo.getObject("asdfasdf").type, "blob")
    test.deepEqual(repo.getObject("asdfasdf").data, "Hello World!")
    test.done()
  }
}

var createTestRepo = function() {
  return new JsGit.GithubProxyRepo("danlucraft", "clojure-dojo", "foopw") 
}
  
exports.GithubProxyRepo = {
  testCreate: function(test) {
    var repo = createTestRepo()
    test.ok(repo)
    test.done()
  },
  
  testHasRemote: function(test) {
    var repo = createTestRepo()
    var remote = repo.getRemote("origin")
    test.equals(remote.url, "http://localhost:3000/github/danlucraft:foopw/clojure-dojo.git")
    test.equals(remote.repo, repo)
    test.done()
  },
  
}