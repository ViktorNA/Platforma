package com.mobile;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class ReactDrawGraphViewPackager implements ReactPackage {
    @Override
    public List<NativeModule>
    createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager>
    createViewManagers(ReactApplicationContext reactContext) {
         return Collections.<ViewManager>singletonList(
            new ReactDrawGraphViewManager()
        );
    }
}
