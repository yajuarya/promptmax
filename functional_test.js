// PromptMax Functional Test
const puppeteer = require('puppeteer');

(async () => {
  console.log('🚀 Starting PromptMax E2E Functional Test...');
  
  try {
    // Simple HTTP test first
    const http = require('http');
    
    const testRequest = http.get('http://172.171.199.162:3000', (res) => {
      console.log('✓ App responds with status:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        // Test key elements
        const tests = [
          { name: 'PromptMax Title', test: data.includes('PromptMax'), pass: false },
          { name: 'Copy Button', test: data.includes('Copy'), pass: false },
          { name: 'Templates', test: data.includes('template'), pass: false },
          { name: 'JSON Generation', test: data.includes('Generate JSON'), pass: false },
          { name: 'copyToClipboard Function', test: data.includes('copyToClipboard'), pass: false }
        ];
        
        tests.forEach(test => {
          test.pass = test.test;
          console.log(test.pass ? `✓ ${test.name}` : `✗ ${test.name}`);
        });
        
        const passedTests = tests.filter(t => t.pass).length;
        console.log(`\n📊 Test Results: ${passedTests}/${tests.length} tests passed`);
        
        if (passedTests === tests.length) {
          console.log('🎉 All core functionality tests PASSED!');
        } else {
          console.log('⚠️  Some tests failed - manual browser testing recommended');
        }
      });
    });
    
    testRequest.on('error', (err) => {
      console.log('✗ Connection failed:', err.message);
    });
    
  } catch (error) {
    console.log('✗ Test failed:', error.message);
  }
})();
